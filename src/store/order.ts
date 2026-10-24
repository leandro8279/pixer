import type { Order, OrderPaginator, OrderQueryOptions } from '@/types';
import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';

import type { RootStore } from './root';
export class OrderStore {
  _state: { id: string; params: Partial<OrderQueryOptions> } = { id: '', params: {} };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      order: computed,
      orderQuery: computed,

      orders: computed,
      ordersQuery: computed,
      paginatorInfo: computed,

      setId: action,
      setParams: action,
    });
  }

  readonly #order = new MobxQuery<Order, Error>({
    queryFn: () => this.service.order.find({ id: this._state.id, language: 'en' }),
  });

  readonly #orders = new MobxQuery<OrderPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.order.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  get orderQuery() {
    return this.#order.query({
      queryKey: [API_ENDPOINTS.ORDERS, this._state.id],
      enabled: Boolean(this._state.id && this.root.auth.isAuthenticated),
    });
  }

  get ordersQuery() {
    return this.#orders.query({
      queryKey: [API_ENDPOINTS.ORDERS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get order(): Order | null {
    return this.orderQuery.data || null;
  }

  get orders(): Order[] {
    return this.ordersQuery.data?.data ?? [];
  }

  get paginatorInfo() {
    const data = this.ordersQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  setId(id: string) {
    this._state.id = id;
  }

  setParams(params: Partial<OrderQueryOptions>) {
    this._state.params = params;
  }

  dispose() {
    this.#order.dispose();
    this.#orders.dispose();
  }
}
