import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useSearchParams } from 'wouter';

import { useRootStore } from '@/contexts/root';
import { siteSettings } from '@/settings/site.settings';
import { adminAndOwnerOnly, adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { STAFF } from '@/utils/constants';
import { ChildMenu, extractHrefObjects, formatOwnerLinks, getUrlLinks } from '@/utils/searched-url';

export const useSearchBar = () => {
  const initialItem: ChildMenu[] = [];
  const auth = useRootStore('auth');
  const [searchParams] = useSearchParams();
  let shop = searchParams.get('shop');
  const { permissions: currentUserPermissions } = getAuthCredentials();
  const store = useLocalObservable(() => ({
    searchText: '',
    searchItem: initialItem,
    setSearchText(value: string) {
      this.searchText = value;
    },
    setSearchItem(value: ChildMenu[]) {
      this.searchItem = value;
    },
  }));

  const getAuthorizedURL = (links: any[]): any[] => {
    return [...links].filter((link) => hasAccess(link?.permissions!, currentUserPermissions));
  };

  useEffect(() => {
    const dispose = reaction(
      () => store.searchText,
      (searchText) => {
        if (searchText === '') {
          store.setSearchItem(initialItem);
        } else {
          handleSearch(searchText);
        }
      },
    );

    return () => dispose();
  }, []);

  const handleSearch = (text: string) => {
    store.setSearchText(text);
    if (!text || text.length < 1) {
      store.setSearchItem([]);
      return;
    }

    const { sidebarLinks } = siteSettings;
    const { admin, shop: shopSideLink, ownerDashboard } = sidebarLinks;

    const adminLinks = extractHrefObjects(Object.values(admin));
    const shopLinks = extractHrefObjects(Object.values(shopSideLink));
    const ownerDashboardLinks = extractHrefObjects(Object.values(ownerDashboard));
    let searchAbleLinks = [];
    let flattenShop = [];

    if (hasAccess([STAFF], currentUserPermissions)) {
      shop = auth.me?.managed_shop?.slug!;
    }

    switch (true) {
      case !shop: // This execute when user under a shop route
        text = `${shop}/${text}`;
        flattenShop = formatOwnerLinks(shopLinks, shop as string);
        searchAbleLinks = getAuthorizedURL(flattenShop);
        break;

      case shop && hasAccess(adminOnly, currentUserPermissions): // This execute when user is and admin but not under a shop route
        searchAbleLinks = adminLinks;
        break;

      case shop && hasAccess(adminAndOwnerOnly, currentUserPermissions): // This execute when user is and vendor but not under a shop route
        flattenShop = [...ownerDashboardLinks];
        auth.me?.shops.map((s) => flattenShop.push(...formatOwnerLinks(shopLinks, s.slug as string)));
        searchAbleLinks = getAuthorizedURL(flattenShop);
        break;

      default:
        searchAbleLinks = getAuthorizedURL(adminLinks);
        break;
    }

    const allLinks = getUrlLinks(searchAbleLinks, text);
    store.setSearchItem([...allLinks]);
  };

  const handleSearchItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    store.setSearchText('');
  };

  const handleCleanItem = () => {
    store.setSearchItem([]);
    store.setSearchText('');
  };

  return { store, handleSearch, handleSearchItem, handleCleanItem };
};
