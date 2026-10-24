import { AdminDashboard } from '@/components/dashboard/admin';
import { getAuthCredentials } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';

export function DashboardPage() {
  const { permissions } = getAuthCredentials();

  if (permissions?.includes(SUPER_ADMIN)) {
    return <AdminDashboard />;
  }
  // return <OwnerDashboard />;
  return null;
}
