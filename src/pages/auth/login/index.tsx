import { useTranslation } from "react-i18next";

import { LoginForm } from "@/components/auth/login/login-form";
import { AuthPageLayout } from "@/components/layouts/auth-layout";
import { Routes } from "@/config/routes";
import { useRouter } from "@/hooks/useRouter";
import { getAuthCredentials, isAuthenticated } from "@/utils/auth-utils";

export function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { token, permissions } = getAuthCredentials();

  if (isAuthenticated({ token, permissions })) {
    router.replace(Routes.dashboard);
  }

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">{t("admin-login-title")}</h3>
      <LoginForm />
    </AuthPageLayout>
  );
}
