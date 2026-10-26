import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, UserQueryOptions } from '@/types';

const initialParams = { page: 1, limit: 20, is_active: true, name: '', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useMyStaffsPage = () => {
  const user = useRootStore('user');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<UserQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    user.setUserStaffsParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => user.setUserStaffsParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, user]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page });
  }

  return { store, handleSearch, handlePagination };
};
