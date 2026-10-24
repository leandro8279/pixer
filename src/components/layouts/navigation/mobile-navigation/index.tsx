import { observer } from 'mobx-react-lite';
import React from 'react';

import { Drawer } from '@/components/ui/drawer';
import { DrawerWrapper } from '@/components/ui/drawer-wrapper';
import { useRootStore } from '@/contexts/root';

interface Props {
  children: React.ReactNode;
}

export const MobileNavigation = observer(({ children }: Props) => {
  const { closeSidebar, displaySidebar } = useRootStore('app');
  return (
    <Drawer
      open={displaySidebar}
      onClose={closeSidebar}
      variant="left"
    >
      <DrawerWrapper onClose={closeSidebar}>{children}</DrawerWrapper>
    </Drawer>
  );
});
