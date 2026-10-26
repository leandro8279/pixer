import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, UserQueryOptions } from '@/types';

const initialParams = { page: 1, limit: 20, search: '', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useCustomersPage = () => {
  const user = useRootStore('user');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<UserQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    user.setCustomersParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => user.setCustomersParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, user]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ search: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
