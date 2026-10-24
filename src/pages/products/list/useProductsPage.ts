import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { ProductQueryOptions, SortOrder } from '@/types';

const initialParams = { page: 1, type: '', name: '', limit: 20, language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useProductsPage = () => {
  const product = useRootStore('product');
  const store = useLocalObservable(() => ({
    visible: true,
    params: initialParams,
    toggleVisible() {
      this.visible = !this.visible;
    },
    setParams(value: Partial<ProductQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    product.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => product.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, product]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
