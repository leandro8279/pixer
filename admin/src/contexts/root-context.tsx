/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';

import { RootStore } from '@/stores/RootStore';
import { rootService } from '@/services/root.service';

const RootContext = React.createContext<RootStore>({} as RootStore);

export function RootProvider({ children }: React.PropsWithChildren) {
  const store = useMemo(() => new RootStore(rootService), []);

  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
}

export function useRootStore() {
  const context = React.useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within a RootProvider');
  }
  return context;
}
