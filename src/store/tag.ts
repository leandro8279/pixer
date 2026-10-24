import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { TagPaginator, TagQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

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

  setParams(value: Partial<TagQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#tags.dispose();
  }
}
