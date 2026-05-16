import { useLocalObservable } from 'mobx-react-lite';

export const useSearchBar = () => {
  const store = useLocalObservable(() => ({
    searchText: '',
    searchItem: [] as any[],
    setSearchText(value: string) {
      this.searchText = value;
    },
    setSearchItem(value: any[]) {
      this.searchItem = value;
    },
  }));

  function handleClearSearch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    store.setSearchText('');
  }

  function handleClearSearchItem() {
    store.setSearchItem([]);
    store.setSearchText('');
  }

  function handleSearch(value: string) {}

  return {
    store,
    handleSearch,
    handleClearSearch,
    handleClearSearchItem,
  };
};
