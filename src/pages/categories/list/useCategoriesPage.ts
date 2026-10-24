import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { CategoryQueryOptions, SortOrder } from '@/types';

const initialParams: Partial<CategoryQueryOptions> = {
  page: 1,
  type: '',
  name: '',
  limit: 20,
  parent: null,
  language: 'en',
  orderBy: 'created_at',
  sortedBy: SortOrder.Desc,
};

export const useCategoriesPage = () => {
  const category = useRootStore('category');
  const store = useLocalObservable(() => ({
    visible: true,
    params: initialParams,
    toggleVisible() {
      this.visible = !this.visible;
    },
    setParams(value: Partial<CategoryQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    category.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => category.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, category]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
