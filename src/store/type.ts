import i18next from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { Routes } from '@/config/routes';
import { RootService } from '@/services/root';
import { GetParams, SortOrder, Type, TypeInput, TypeQueryOptions } from '@/types';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

const initialParams = { name: '', orderBy: 'created_at', sortedBy: SortOrder.Desc, language: 'en' } as Partial<TypeQueryOptions>;

export class TypeStore {
  _state = { slug: '', params: { language: 'en' } as Partial<TypeQueryOptions> };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      type: computed,
      typeQuery: computed,

      types: computed,
      typesQuery: computed,

      create: computed,
      update: computed,

      setSlug: action,
      setParams: action,
    });
  }

  readonly #type = new MobxQuery<Type, Error>({
    queryFn: ({ queryKey }) => this.service.type.findBy(queryKey[1] as GetParams),
  });

  readonly #types = new MobxQuery<Type[], Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.type.all(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #create = new MobxMutation<Type, Error, TypeInput>({
    mutationFn: (variables) => this.service.type.create(variables),
    onSuccess: () => {
      this.refetch();
      toast.success(i18next.t('successfully-created'));
      this.root.router.push(Routes.type.list);
    },
  });

  readonly #update = new MobxMutation<Type, Error, TypeInput & { id: string }>({
    onSettled: () => this.refetch(),
    mutationFn: (variables) => this.service.type.update(variables),
    onSuccess: () => toast.success(i18next.t('successfully-updated')),
  });

  private refetch() {
    this.setParams(initialParams);
    this.typesQuery.refetch();
  }
  get typeQuery() {
    return this.#type.query({
      enabled: Boolean(this._state.slug),
      queryKey: [API_ENDPOINTS.TYPES, { slug: this._state.slug }],
    });
  }

  get typesQuery() {
    return this.#types.query({ queryKey: [API_ENDPOINTS.TYPES, this._state.params] });
  }

  get create() {
    return this.#create;
  }

  get update() {
    return this.#update;
  }

  get type() {
    return this.typeQuery.data || null;
  }

  get types() {
    return this.typesQuery.data || [];
  }

  setSlug(value: string) {
    this._state.slug = value;
  }

  setParams(value: Partial<TypeQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#type.dispose();
    this.#types.dispose();
    this.#create.dispose();
    this.#update.dispose();
  }
}
