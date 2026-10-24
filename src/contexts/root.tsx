/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useMemo } from 'react';

import { rootService } from '@/services/root';
import { RootStore } from '@/store/root';

export const RootContext = React.createContext<RootStore | null>(null);

export function RootProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => new RootStore(rootService), []);

  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
}

export function useRootStore(): RootStore;
export function useRootStore<K extends keyof RootStore>(key: K): RootStore[K];

export function useRootStore<K extends keyof RootStore>(key?: K) {
  const store = useContext(RootContext);

  if (!store) {
    throw new Error('useRootStore must be used within RootProvider');
  }

  return key === undefined ? store : store[key];
}
