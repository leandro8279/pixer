import i18next from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { Routes } from '@/config/routes';
import { RootService } from '@/services/root';
import { SortOrder, Tax, TaxQueryOptions } from '@/types';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

const initialParams = { name: '', language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export class TaxeStore {
  readonly _state = { params: {} as Partial<TaxQueryOptions> };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      taxes: computed,
      taxesQuery: computed,

      setParams: action,
    });
  }

  readonly #taxes = new MobxQuery<Tax[], Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.taxe.all(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #create = new MobxMutation<Tax, Error, Tax>({
    mutationFn: (variables) => this.service.taxe.create(variables),
    onSuccess: () => {
      toast.success(i18next.t('successfully-created'));
      this.root.router.push(Routes.tax.list);
    },
    onSettled: () => this.refetch(),
  });

  readonly #update = new MobxMutation<Tax, Error, Tax & { id: string }>({
    mutationFn: (variables) => this.service.taxe.update(variables),
    onSuccess: () => toast.success(i18next.t('successfully-updated')),
    onSettled: () => this.refetch(),
  });

  private refetch() {
    this.setParams(initialParams);
    this.taxesQuery.refetch();
  }

  get taxesQuery() {
    return this.#taxes.query({
      queryKey: [API_ENDPOINTS.TAXES, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get taxes() {
    return this.taxesQuery.data || [];
  }

  get create() {
    return this.#create;
  }

  get update() {
    return this.#update;
  }

  setParams(value: Partial<TaxQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#taxes.dispose();
    this.#create.dispose();
    this.#update.dispose();
  }
}
