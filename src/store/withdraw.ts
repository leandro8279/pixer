import type { WithdrawPaginator, WithdrawQueryOptions } from '@/types';
import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

export class WithdrawStore {
  _state: { id: string; params: Partial<WithdrawQueryOptions> } = { id: '', params: {} };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      //   withdraw: computed,
      //   withdrawQuery: computed,

      withdraws: computed,
      withdrawsQuery: computed,
      paginatorInfo: computed,

      setId: action,
      setParams: action,
    });
  }

  //   readonly #withdraw = new MobxQuery<Withdraw, Error>({
  //     queryFn: () => this.service.withdraw.findById(this._state.id),
  //   });

  readonly #withdraws = new MobxQuery<WithdrawPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.withdraw.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  //   get withdrawQuery() {
  //     return this.#withdraw.query({
  //       queryKey: [API_ENDPOINTS.WITHDRAWS, this._state.id],
  //       enabled: Boolean(this._state.id && this.root.auth.isAuthenticated),
  //     });
  //   }

  get withdrawsQuery() {
    return this.#withdraws.query({
      queryKey: [API_ENDPOINTS.WITHDRAWS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  //   get withdraw() {
  //     return this.withdrawQuery.data || null;
  //   }

  get withdraws() {
    return this.withdrawsQuery.data?.data ?? [];
  }

  get paginatorInfo() {
    const data = this.withdrawsQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  setId(id: string) {
    this._state.id = id;
  }

  setParams(params: Partial<WithdrawQueryOptions>) {
    this._state.params = params;
  }

  dispose() {
    // this.#withdraw.dispose();
    this.#withdraws.dispose();
  }
}
