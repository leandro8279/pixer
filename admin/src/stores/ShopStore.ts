import type { RootService } from '@/services/root.service';
import { API_ENDPOINTS } from '@/utils/constants';

import { action, computed, makeObservable } from 'mobx';

import { MobxQuery } from './MobxQuery';

import type { RootStore } from './RootStore';

export class ShopStore {
  slug = '';
  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      shop: computed,
      shopQuery: computed,
      setShopSlug: action,
    });
  }

  readonly #shop = new MobxQuery({
    enabled: false,
    queryKey: [API_ENDPOINTS.SHOPS, this.slug],
    queryFn: () => this.service.shop.getShop(this.slug),
  });

  get shopQuery() {
    return this.#shop.query({
      queryKey: [API_ENDPOINTS.SHOPS, this.slug],
      queryFn: () => this.service.shop.getShop(this.slug),
      enabled: Boolean(this.slug && this.root.auth.isAuthenticated),
    });
  }

  get shop() {
    return this.shopQuery.data || null;
  }

  setShopSlug(slug: string) {
    this.slug = slug;
  }

  dispose() {
    this.#shop.dispose();
  }
}
