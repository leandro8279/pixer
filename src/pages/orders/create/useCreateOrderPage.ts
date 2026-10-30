import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { ProductQueryOptions, ProductStatus } from '@/types';

const initialParams = { limit: 18, language: 'en', status: ProductStatus.Publish, name: '', page: 1, type: '', categories: '' };
export const useCreateOrderPage = () => {
  const product = useRootStore('product');

  const store = useLocalObservable(() => ({
    visible: false,
    params: {} as Partial<ProductQueryOptions>,
    setVisible(value: boolean) {
      this.visible = value;
    },
    setParams(value: Partial<ProductQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    product.setParams(initialParams);
  }, [product, store]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  function toggleVisible() {
    store.setVisible(!store.visible);
  }

  return { store, toggleVisible, handleSearch, handlePagination };
};
