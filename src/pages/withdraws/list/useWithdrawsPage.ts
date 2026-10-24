import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { ProductQueryOptions, SortOrder } from '@/types';

const initialParams = { page: 1, limit: 20, language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useWithdrawsPage = () => {
  const withdraw = useRootStore('withdraw');
  const store = useLocalObservable(() => ({
    params: initialParams,

    setParams(value: Partial<ProductQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    withdraw.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => withdraw.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, withdraw]);

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handlePagination };
};
