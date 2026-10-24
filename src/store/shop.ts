import i18n from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { queryClient } from '@/config/query-client';
import { Routes } from '@/config/routes';
import { RootService } from '@/services/root';
import { Shop, ShopInput, ShopPaginator, ShopQueryOptions, SortOrder } from '@/types';
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

export class ShopStore {
  _state = {
    slug: '',
    params: {
      page: 1,
      name: '',
      limit: 10,
      orderBy: 'created_at',
      sortedBy: SortOrder.Desc,
    } as Partial<ShopQueryOptions>,
  };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,
      shop: computed,
      shopQuery: computed,
      shopsQuery: computed,
      shops: computed,
      paginatorInfo: computed,
      create: computed,
      update: computed,
      setShopSlug: action,
      setParams: action,
    });
  }

  readonly #create = new MobxMutation<Shop, Error, ShopInput>({
    mutationFn: (variables) => this.service.shop.create(variables),
    onSuccess: () => {
      const { permissions } = getAuthCredentials();
      if (hasAccess(adminOnly, permissions)) {
        return (window.location.href = Routes.adminMyShops);
      }
      return (window.location.href = Routes.dashboard);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.SHOPS] }),
  });

  readonly #update = new MobxMutation<Shop, Error, Partial<ShopInput> & { id: string }>({
    mutationFn: (variables) => this.service.shop.update(variables),
    onSuccess: (data) => {
      window.location.href = `${data.slug}/edit`;
      toast.success(i18n.t('successfully-updated'));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.SHOPS] }),
  });

  readonly #shop = new MobxQuery({
    enabled: false,
    queryFn: ({ queryKey }: any) => this.service.shop.findById(queryKey[1]),
  });

  readonly #shops = new MobxQuery<ShopPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.shop.paginated(Object.assign({}, queryKey[1], pageParam)),
  });

  get shopQuery() {
    return this.#shop.query({
      queryKey: [API_ENDPOINTS.SHOPS, { slug: this._state.slug }],
      enabled: Boolean(this._state.slug && this.root.auth.isAuthenticated),
    });
  }

  get shopsQuery() {
    return this.#shops.query({
      enabled: Object.keys(this._state.params).length > 0,
      queryKey: [API_ENDPOINTS.SHOPS, this._state.params],
    });
  }

  get shop() {
    return this.shopQuery.data || null;
  }

  get shops() {
    return this.shopsQuery.data?.data || [];
  }

  get paginatorInfo() {
    return mapPaginatorData(this.shopsQuery.data);
  }

  get create() {
    return this.#create;
  }

  get update() {
    return this.#update;
  }

  setShopSlug(slug: string) {
    this._state.slug = slug;
  }

  setParams(value: Partial<ShopQueryOptions>) {
    this._state.params = { ...this._state.params, ...value };
  }

  dispose() {
    this.#shop.dispose();
    this.#shops.dispose();
    this.#create.dispose();
    this.#update.dispose();
  }
}
