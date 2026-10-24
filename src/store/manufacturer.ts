import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { ManufacturerQueryOptions } from '@/types';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

export class ManufacturerStore {
  _state = { params: {} as Partial<ManufacturerQueryOptions> };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      manufacturers: computed,
      manufacturersQuery: computed,

      setParams: action,
    });
  }

  readonly #manufacturers = new MobxQuery({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.manufacturer.paginated(Object.assign({}, queryKey[1], pageParam)),
  });

  get manufacturersQuery() {
    return this.#manufacturers.query({
      queryKey: [API_ENDPOINTS.MANUFACTURERS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get manufacturers() {
    return this.manufacturersQuery.data?.data || [];
  }

  setParams(value: Partial<ManufacturerQueryOptions>) {
    this._state.params = { ...this._state.params, ...value };
  }
  dispose() {
    this.#manufacturers.dispose();
  }
}
