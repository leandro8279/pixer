import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { Product, ProductPaginator, ProductQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

export class ProductStore {
  _state: {
    slug: string;
    params: Partial<ProductQueryOptions>;
    lowOrOutOfStockParams: Partial<ProductQueryOptions>;
    popularParams: Partial<ProductQueryOptions>;
    lowStockParams: Partial<ProductQueryOptions>;
    categoryParams: Partial<{ limit: number; language?: string }>;
    mostSoldByCategoryParams: Partial<ProductQueryOptions>;
    topRatedParams: Partial<ProductQueryOptions>;
    inActiveProductsParams: Partial<ProductQueryOptions>;
  } = {
    slug: '',
    params: {},
    popularParams: {},
    lowStockParams: {},
    topRatedParams: {},
    lowOrOutOfStockParams: {},
    categoryParams: { limit: 10 },
    mostSoldByCategoryParams: {},
    inActiveProductsParams: {},
  };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      product: computed,
      productQuery: computed,

      products: computed,
      productsQuery: computed,
      paginatorInfo: computed,

      lowOrOutOfStockQuery: computed,
      lowOrOutOfStockProducts: computed,
      lowOrOutOfStockPaginatorInfo: computed,

      popularQuery: computed,
      popularProducts: computed,

      lowStockQuery: computed,
      lowStockProducts: computed,

      productByCategoryQuery: computed,
      productsByCategory: computed,

      mostSoldByCategoryQuery: computed,
      mostSoldProductsByCategory: computed,

      topRatedQuery: computed,
      topRatedProducts: computed,

      inActiveProducts: computed,
      inActiveProductsQuery: computed,
      inActiveProductsPaginatorInfo: computed,

      setSlug: action,
      setParams: action,
      setLowOrOutOfStockParams: action,
      setPopularParams: action,
      setLowStockParams: action,
      setCategoryParams: action,
      setMostSoldByCategoryParams: action,
      setTopRatedParams: action,
      setInActiveProductsParams: action,
    });
  }

  readonly #product = new MobxQuery({
    queryFn: () => this.service.product.findBySlug({ slug: this._state.slug, language: 'en' }),
  });

  readonly #products = new MobxQuery<ProductPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.product.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  readonly #lowOrOutOfStock = new MobxQuery<ProductPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.product.lowOrOutOfStockProducts(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  readonly #popular = new MobxQuery<Product[], Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.product.popular(Object.assign({}, pageParam, queryKey[1])),
  });

  readonly #lowStock = new MobxQuery<Product[], Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.product.lowStock(Object.assign({}, pageParam, queryKey[1])),
  });

  readonly #productByCategory = new MobxQuery<Product[], Error>({
    queryFn: () =>
      this.service.product.productByCategory({
        limit: this._state.categoryParams.limit,
        language: this._state.categoryParams.language,
      }),
  });

  readonly #mostSoldByCategory = new MobxQuery<Product[], Error>({
    queryFn: ({ queryKey }) => this.service.product.mostSoldProductByCategory(queryKey[1] as Partial<ProductQueryOptions>),
  });

  readonly #topRated = new MobxQuery<Product[], Error>({
    queryFn: ({ queryKey }) => this.service.product.topRated(queryKey[1] as Partial<ProductQueryOptions>),
  });

  readonly #inActiveProducts = new MobxQuery<ProductPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.product.newOrInActiveProducts(Object.assign({}, queryKey[1], pageParam)),
  });

  get productQuery() {
    return this.#product.query({
      queryKey: [API_ENDPOINTS.PRODUCTS, this._state.slug],
      enabled: Boolean(this.root.auth.isAuthenticated),
    });
  }

  get productsQuery() {
    return this.#products.query({
      queryKey: [API_ENDPOINTS.PRODUCTS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get lowOrOutOfStockQuery() {
    return this.#lowOrOutOfStock.query({
      queryKey: [API_ENDPOINTS.LOW_OR_OUT_OF_STOCK_PRODUCTS, this._state.lowOrOutOfStockParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.lowOrOutOfStockParams).length),
    });
  }

  get popularQuery() {
    return this.#popular.query({
      queryKey: [API_ENDPOINTS.POPULAR_PRODUCTS, this._state.popularParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.popularParams).length),
    });
  }

  get lowStockQuery() {
    return this.#lowStock.query({
      queryKey: [API_ENDPOINTS.LOW_STOCK_PRODUCTS_ANALYTICS, this._state.lowStockParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.lowStockParams).length),
    });
  }

  get productByCategoryQuery() {
    return this.#productByCategory.query({
      queryKey: [API_ENDPOINTS.CATEGORY_WISE_PRODUCTS, { limit: this._state.categoryParams.limit }],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.categoryParams).length),
    });
  }

  get mostSoldByCategoryQuery() {
    return this.#mostSoldByCategory.query({
      queryKey: [API_ENDPOINTS.CATEGORY_WISE_PRODUCTS_SALE, this._state.mostSoldByCategoryParams],
      enabled: Boolean(this.root.auth.isAuthenticated),
    });
  }

  get topRatedQuery() {
    return this.#topRated.query({
      queryKey: [API_ENDPOINTS.TOP_RATED_PRODUCTS, this._state.topRatedParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.topRatedParams).length),
    });
  }

  get inActiveProductsQuery() {
    return this.#inActiveProducts.query({
      enabled: Boolean(Object.keys(this._state.inActiveProductsParams).length),
      queryKey: [API_ENDPOINTS.NEW_OR_INACTIVE_PRODUCTS, this._state.inActiveProductsParams],
    });
  }

  get product() {
    return this.productQuery.data || null;
  }

  get products() {
    return this.productsQuery.data?.data ?? [];
  }

  get paginatorInfo() {
    const data = this.productsQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  get lowOrOutOfStockProducts() {
    return this.lowOrOutOfStockQuery.data?.data ?? [];
  }

  get lowOrOutOfStockPaginatorInfo() {
    const data = this.lowOrOutOfStockQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  get popularProducts(): Product[] {
    return this.popularQuery.data ?? [];
  }

  get lowStockProducts(): Product[] {
    return this.lowStockQuery.data ?? [];
  }

  get productsByCategory(): Product[] {
    return this.productByCategoryQuery.data ?? [];
  }

  get mostSoldProductsByCategory(): Product[] {
    return this.mostSoldByCategoryQuery.data ?? [];
  }

  get topRatedProducts(): Product[] {
    return this.topRatedQuery.data ?? [];
  }

  get inActiveProducts() {
    return this.inActiveProductsQuery.data?.data || [];
  }

  get inActiveProductsPaginatorInfo() {
    const data = this.inActiveProductsQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  setSlug(slug: string) {
    this._state.slug = slug;
  }

  setParams(params: Partial<ProductQueryOptions>) {
    this._state.params = params;
  }

  setLowOrOutOfStockParams(params: Partial<ProductQueryOptions>) {
    this._state.lowOrOutOfStockParams = { ...this._state.lowOrOutOfStockParams, ...params };
  }

  setPopularParams(params: Partial<ProductQueryOptions>) {
    this._state.popularParams = params;
  }

  setLowStockParams(params: Partial<ProductQueryOptions>) {
    this._state.lowStockParams = params;
  }

  setCategoryParams(params: Partial<{ limit: number; language: string }>) {
    this._state.categoryParams = params;
  }

  setMostSoldByCategoryParams(params: Partial<ProductQueryOptions>) {
    this._state.mostSoldByCategoryParams = { ...this._state.mostSoldByCategoryParams, ...params };
  }

  setTopRatedParams(params: Partial<ProductQueryOptions>) {
    this._state.topRatedParams = params;
  }

  setInActiveProductsParams(params: Partial<ProductQueryOptions>) {
    this._state.inActiveProductsParams = params;
  }

  dispose() {
    this.#product.dispose();
    this.#products.dispose();
    this.#lowOrOutOfStock.dispose();
    this.#popular.dispose();
    this.#lowStock.dispose();
    this.#productByCategory.dispose();
    this.#mostSoldByCategory.dispose();
    this.#topRated.dispose();
    this.#inActiveProducts.dispose();
  }
}
