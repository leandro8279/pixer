import i18next from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { Routes } from '@/config/routes';
import { RootService } from '@/services/root';
import { Category, CategoryInput, CategoryPaginator, CategoryQueryOptions, SortOrder } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

const initialParams: Partial<CategoryQueryOptions> = {
  page: 1,
  type: '',
  name: '',
  limit: 20,
  parent: null,
  language: 'en',
  orderBy: 'created_at',
  sortedBy: SortOrder.Desc,
};

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

      create: computed,
      update: computed,

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

  readonly #create = new MobxMutation<Category, Error, CategoryInput>({
    mutationFn: (variables) => this.service.category.create(variables),
    onSuccess: () => {
      this.setParams(initialParams);
      toast.success(i18next.t('successfully-created'));
      this.root.router.push(Routes.category.list);
    },
  });

  readonly #update = new MobxMutation<Category, Error, CategoryInput & { id: string }>({
    mutationFn: (variables) => this.service.category.update(variables),
    onSuccess: (data) => {
      this.setParams(initialParams);
      const shop = this.root.router.searchParams.get('shop');
      const generateRedirectUrl = shop ? `/${shop}${Routes.category.list}` : Routes.category.list;

      toast.success(i18next.t('successfully-updated'));
      this.root.router.push(`${generateRedirectUrl}/${data?.slug}/edit`);
    },
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

  get create() {
    return this.#create;
  }

  get update() {
    return this.#update;
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
    this.#create.dispose();
    this.#update.dispose();
  }
}
