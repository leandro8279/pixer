import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, TypeQueryOptions } from '@/types';

const initialParams = { name: '', orderBy: 'created_at', sortedBy: SortOrder.Desc, language: 'en' } as Partial<TypeQueryOptions>;

export const useGroupsPage = () => {
  const type = useRootStore('type');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<TypeQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    type.setParams(initialParams);
    const dispose = reaction(
      () => store.params,
      (params) => type.setParams(params),
    );

    return () => dispose();
  }, []);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText });
  }

  return { store, handleSearch };
};
