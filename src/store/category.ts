import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { Category, CategoryPaginator, CategoryQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';

import type { RootStore } from './root';
export class CategoryStore {
  _state: { slug: string; params: Partial<CategoryQueryOptions> } = { slug: '', params: {} };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      category: computed,
      categoryQuery: computed,

      categories: computed,
      categoriesQuery: computed,
      paginatorInfo: computed,

      setSlug: action,
      setParams: action,
    });
  }

  readonly #category = new MobxQuery<Category, Error>({
    queryFn: () => this.service.category.find({ slug: this._state.slug, language: 'en' }),
  });

  readonly #categories = new MobxQuery<CategoryPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.category.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  get categoryQuery() {
    return this.#category.query({
      queryKey: [API_ENDPOINTS.CATEGORIES, this._state.slug],
      enabled: Boolean(this._state.slug && this.root.auth.isAuthenticated),
    });
  }

  get categoriesQuery() {
    return this.#categories.query({
      queryKey: [API_ENDPOINTS.CATEGORIES, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get category(): Category | null {
    return this.categoryQuery.data || null;
  }

  get categories(): Category[] {
    return this.categoriesQuery.data?.data ?? [];
  }

  get paginatorInfo() {
    const data = this.categoriesQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  setSlug(slug: string) {
    this._state.slug = slug;
  }

  setParams(params: Partial<CategoryQueryOptions>) {
    this._state.params = params;
  }

  dispose() {
    this.#category.dispose();
    this.#categories.dispose();
  }
}
