import { action, computed, makeObservable, observable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { FAQsPaginator, FAQsQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxQuery } from './query';
import { RootStore } from './root';

export class FaqStore {
  readonly _state = { params: {} as Partial<FAQsQueryOptions> };
  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      faqs: computed,
      faqsQuery: computed,
      paginatorInfo: computed,

      setParams: action,
    });
  }

  readonly #faqs = new MobxQuery<FAQsPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.faq.paginated(Object.assign({}, queryKey[1], pageParam)),
  });

  get faqsQuery() {
    return this.#faqs.query({
      queryKey: [API_ENDPOINTS.FAQS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  get faqs() {
    return this.faqsQuery.data?.data || [];
  }

  get paginatorInfo() {
    return mapPaginatorData(this.faqsQuery.data);
  }

  setParams(value: Partial<FAQsQueryOptions>) {
    this._state.params = value;
  }

  dispose() {
    this.#faqs.dispose();
  }
}
