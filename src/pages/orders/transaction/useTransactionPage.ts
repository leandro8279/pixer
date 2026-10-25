import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { OrderQueryOptions, SortOrder } from '@/types';

const initialParams = { page: 1, tracking_number: '', limit: 20, language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useTransactionPage = () => {
  const order = useRootStore('order');
  const store = useLocalObservable(() => ({
    params: initialParams,

    setParams(value: Partial<OrderQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    order.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => order.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, order]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  async function handleExportOrder() {
    // const { data } = await refetch();
    // if (data) {
    //   const a = document.createElement('a');
    //   a.href = data;
    //   a.setAttribute('download', 'export-order');
    //   a.click();
    // }
  }

  return { store, handleSearch, handlePagination, handleExportOrder };
};
