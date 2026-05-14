/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';

import { RootStore } from '@/stores/RootStore';

const RootContext = React.createContext<RootStore>({} as RootStore);

export function RootProvider({ children }: React.PropsWithChildren) {
  const store = useMemo(() => new RootStore(), []);

  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
}

export function useRootStore() {
  const context = React.useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within a RootProvider');
  }
  return context;
}
