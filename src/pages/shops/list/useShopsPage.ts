import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder } from '@/types';

export const useShopsPage = () => {
  const shop = useRootStore('shop');

  useEffect(() => {
    shop.setParams({ page: 1, name: '', limit: 10, orderBy: 'created_at', sortedBy: SortOrder.Desc });
  }, []);

  function handleSearch({ searchText }: { searchText: string }) {
    shop.setParams({ name: searchText });
  }

  function handlePagination(page: number) {
    shop.setParams({ page });
  }

  return { handleSearch, handlePagination };
};
