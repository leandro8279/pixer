import React from 'react';

import { AdminLayout } from './admin';

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  //   if (userPermissions?.includes(SUPER_ADMIN)) {
  return <AdminLayout>{children}</AdminLayout>;
  //   }
  //   return <OwnerLayout {...props} />;
}
