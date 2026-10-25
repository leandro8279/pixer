import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, TermsAndConditionsQueryOptions } from '@/types';

const initialParams = { page: 1, limit: 20, title: '', language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useTermsAndConditionsPage = () => {
  const termsAndCondition = useRootStore('termsAndCondition');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<TermsAndConditionsQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    termsAndCondition.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => termsAndCondition.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, termsAndCondition]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ title: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
