import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { TermsAndConditionsPaginator, TermsAndConditionsQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

export class TermsAndConditionStore {
  readonly _state = { params: {} as Partial<TermsAndConditionsQueryOptions> };
  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      termsAndConditions: computed,
      termsAndConditionsQuery: computed,
      paginatorInfo: computed,

      setParams: action,
    });
  }

  readonly #termsAndConditions = new MobxQuery<TermsAndConditionsPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.termsAndCondition.paginated(Object.assign({}, queryKey[1], pageParam)),
  });

  get termsAndConditionsQuery() {
    return this.#termsAndConditions.query({
      queryKey: [API_ENDPOINTS.TERMS_AND_CONDITIONS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get termsAndConditions() {
    return this.termsAndConditionsQuery.data?.data || [];
  }

  get paginatorInfo() {
    return mapPaginatorData(this.termsAndConditionsQuery.data);
  }

  setParams(value: Partial<TermsAndConditionsQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#termsAndConditions.dispose();
  }
}
