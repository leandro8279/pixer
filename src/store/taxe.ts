import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { TaxQueryOptions } from '@/types';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

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

  readonly #taxes = new MobxQuery({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.taxe.all(Object.assign({}, queryKey[1], pageParam)),
  });

  get taxesQuery() {
    return this.#taxes.query({
      queryKey: [API_ENDPOINTS.TAXES, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get taxes() {
    return this.taxesQuery.data || [];
  }

  setParams(value: Partial<TaxQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#taxes.dispose();
  }
}
