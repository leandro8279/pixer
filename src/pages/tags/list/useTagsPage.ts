import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, TagQueryOptions } from '@/types';

const initialParams = { page: 1, limit: 10, type: '', name: '', language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useTagsPage = () => {
  const tag = useRootStore('tag');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<TagQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    tag.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => tag.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, tag]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
