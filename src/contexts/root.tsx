/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useMemo } from 'react';

import { useRouter } from '@/hooks/useRouter';
import { rootService } from '@/services/root';
import { RootStore } from '@/store/root';

export const RootContext = React.createContext<RootStore | null>(null);

export type IRouter = ReturnType<typeof useRouter>;

export function RootProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const store = useMemo(() => new RootStore(rootService, router), []);

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
