import i18next from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { Routes } from '@/config/routes';
import { RootService } from '@/services/root';
import { SortOrder, Tag, TagInput, TagPaginator, TagQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

const initialParams = { page: 1, limit: 10, type: '', name: '', language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export class TagStore {
  readonly _state = { params: {} as Partial<TagQueryOptions> };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      tags: computed,
      tagsQuery: computed,
      paginatorInfo: computed,

      setParams: action,
    });
  }

  readonly #tags = new MobxQuery<TagPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.tag.paginated(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #create = new MobxMutation<Tag, Error, TagInput>({
    mutationFn: (variables) => this.service.tag.create(variables),
    onSuccess: () => {
      this.refetch();
      toast.success(i18next.t('successfully-created'));
      this.root.router.push(Routes.tag.list);
    },
  });

  readonly #update = new MobxMutation<Tag, Error, TagInput & { id: string }>({
    mutationFn: (variables) => this.service.tag.update(variables),
    onSuccess: (data) => {
      this.refetch();
      toast.success(i18next.t('successfully-updated'));
      const shop = this.root.router.searchParams.get('shop');

      const generateRedirectUrl = shop ? `/${shop}${Routes.tag.list}` : Routes.tag.list;
      this.root.router.push(`${generateRedirectUrl}/${data?.slug}/edit`);
    },
  });

  private refetch() {
    this.setParams(initialParams);
    this.tagsQuery.refetch();
  }

  get tagsQuery() {
    return this.#tags.query({
      queryKey: [API_ENDPOINTS.TAGS, this._state.params],
      enabled: Boolean(Object.keys(this._state.params).length && this.root.auth.isAuthenticated),
    });
  }

  get tags() {
    return this.tagsQuery.data?.data || [];
  }

  get paginatorInfo() {
    return mapPaginatorData(this.tagsQuery.data);
  }

  get create() {
    return this.#create;
  }

  get update() {
    return this.#update;
  }

  setParams(value: Partial<TagQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#tags.dispose();
    this.#create.dispose();
    this.#update.dispose();
  }
}
