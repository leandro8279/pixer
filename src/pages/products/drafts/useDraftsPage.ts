import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';
import { SortOrder } from '@/types';

export const useDraftsPage = () => {
  const auth = useRootStore('auth');
  const product = useRootStore('product');
  const store = useLocalObservable(() => ({
    visible: true,
    params: { page: 1, name: '', orderBy: 'created_at', sortedBy: SortOrder.Desc, limit: 10, status: 'draft', language: 'en' },
    setVisible(value: boolean) {
      this.visible = value;
    },
    setParams(value: any) {
      this.params = { ...this.params, ...value };
    },
  }));

  useEffect(() => {
    const dispose = reaction(
      () => ({ user: auth.me, params: store.params }),
      ({ params, user }) => product.setInActiveProductsParams({ ...params, user_id: user.id }),
    );

    return () => dispose();
  }, [store, auth, product]);

  function toggleVisible() {
    store.setVisible(!store.visible);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    store.setParams({ name: searchText, page: 1 });
  }

  function handlePagination(page: number) {
    store.setParams({ page: page });
  }

  return { store, handleSearch, toggleVisible, handlePagination };
};
