import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { ProductQueryOptions, SortOrder } from '@/types';

const initialParams = { language: 'en', name: '', limit: 10, page: 1, orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useProductStockPage = () => {
  const product = useRootStore('product');
  const store = useLocalObservable(() => ({
    visible: true,
    params: initialParams,
    setParams(params: Partial<ProductQueryOptions>) {
      this.params = { ...this.params, ...params };
    },
    setVisible(value: boolean) {
      this.visible = value;
    },
  }));

  useEffect(() => {
    product.setLowOrOutOfStockParams(initialParams);

    const dispose = reaction(
      () => store.params,
      (params) => product.setLowOrOutOfStockParams(params),
    );

    return () => dispose();
  }, []);

  function toggleVisible() {
    store.setVisible(!store.visible);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, toggleVisible, handlePagination, handleSearch };
};
