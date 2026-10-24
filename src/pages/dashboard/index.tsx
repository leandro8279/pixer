import { AdminDashboard } from "@/components/dashboard/admin";
import { Routes } from "@/config/routes";
import { useRouter } from "@/hooks/useRouter";
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { SUPER_ADMIN } from "@/utils/constants";

export function DashboardPage() {
  const router = useRouter();
  const { token, permissions } = getAuthCredentials();

  if (!isAuthenticated({ token, permissions }) || !hasAccess(allowedRoles, permissions)) {
    router.replace(Routes.login);
  }

  if (permissions?.includes(SUPER_ADMIN)) {
    return <AdminDashboard />;
  }
  // return <OwnerDashboard />;
}
