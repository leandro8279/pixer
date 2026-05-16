import { AdminDashboard } from '@/components/dashboard/admin';

export function HomePage() {
  // if (userPermissions?.includes(SUPER_ADMIN)) {
  //   return <AdminDashboard />;
  // }
  // return <OwnerDashboard />;

  return <AdminDashboard />;
}
