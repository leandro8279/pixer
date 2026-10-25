import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { FAQsQueryOptions, SortOrder } from '@/types';

const initialParams: Partial<FAQsQueryOptions> = {
  page: 1,
  faq_title: '',
  limit: 20,
  language: 'en',
  orderBy: 'created_at',
  sortedBy: SortOrder.Desc,
};

export const useFaqsPage = () => {
  const faq = useRootStore('faq');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<FAQsQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    faq.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => faq.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, faq]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ faq_title: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
