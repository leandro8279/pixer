import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { GetParams, Type, TypeQueryOptions } from '@/types';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';

export class TypeStore {
  _state = { slug: '', params: { language: 'en' } as Partial<TypeQueryOptions> };

  constructor(private readonly service: RootService) {
    makeObservable(this, { type: computed, typeQuery: computed, _state: observable, setSlug: action, types: computed, typesQuery: computed });
  }

  readonly #type = new MobxQuery<Type, Error>({
    queryFn: ({ queryKey }) => this.service.type.findBy(queryKey[1] as GetParams),
  });

  readonly #types = new MobxQuery<Type[], Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.type.all(Object.assign({}, queryKey[1], pageParam)),
  });

  get typeQuery() {
    return this.#type.query({
      enabled: Boolean(this._state.slug),
      queryKey: [API_ENDPOINTS.TYPES, { slug: this._state.slug }],
    });
  }

  get typesQuery() {
    return this.#types.query({ queryKey: [API_ENDPOINTS.TYPES, this._state.params] });
  }

  get type() {
    return this.typeQuery.data || null;
  }

  get types() {
    return this.typesQuery.data || [];
  }

  setSlug(value: string) {
    this._state.slug = value;
  }

  setParams(value: Partial<TypeQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#type.dispose();
    this.#types.dispose();
  }
}
