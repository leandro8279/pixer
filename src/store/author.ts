import type { Author, AuthorPaginator, AuthorQueryOptions } from '@/types';
import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';

import type { RootStore } from './root';

export class AuthorStore {
  _state: { slug: string; params: Partial<AuthorQueryOptions> } = { slug: '', params: {} };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      author: computed,
      authorQuery: computed,

      authors: computed,
      authorsQuery: computed,
      paginatorInfo: computed,

      setSlug: action,
      setParams: action,
    });
  }

  readonly #author = new MobxQuery<Author, Error>({
    queryFn: () => this.service.author.find({ slug: this._state.slug, language: 'en' }),
  });

  readonly #authors = new MobxQuery<AuthorPaginator, Error>({
    queryFn: ({ queryKey, pageParam }) => this.service.author.paginated(Object.assign({}, queryKey[1], pageParam)),
    placeholderData: keepPreviousData,
  });

  get authorQuery() {
    return this.#author.query({
      queryKey: [API_ENDPOINTS.AUTHORS, this._state.slug],
      enabled: Boolean(this._state.slug && this.root.auth.isAuthenticated),
    });
  }

  get authorsQuery() {
    return this.#authors.query({
      queryKey: [API_ENDPOINTS.AUTHORS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get author(): Author | null {
    return this.authorQuery.data || null;
  }

  get authors(): Author[] {
    return this.authorsQuery.data?.data ?? [];
  }

  get paginatorInfo() {
    const data = this.authorsQuery.data;
    return data ? mapPaginatorData(data) : null;
  }

  setSlug(slug: string) {
    this._state.slug = slug;
  }

  setParams(params: Partial<AuthorQueryOptions>) {
    this._state.params = { ...this._state.params, ...params };
  }

  dispose() {
    this.#author.dispose();
    this.#authors.dispose();
  }
}
