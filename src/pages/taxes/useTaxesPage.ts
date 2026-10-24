import { compareStructural, reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder, TaxQueryOptions } from '@/types';

const initialParams = { name: '', language: 'en', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export const useTaxesPage = () => {
  const taxe = useRootStore('taxe');
  const store = useLocalObservable(() => ({
    params: initialParams,
    setParams(value: Partial<TaxQueryOptions>) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    taxe.setParams(initialParams);
    const dispose = reaction(
      () => ({ ...store.params }),
      (params) => taxe.setParams(params),
      { equals: compareStructural },
    );

    return () => dispose();
  }, [store, taxe]);

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText });
  }

  return { store, handleSearch };
};
