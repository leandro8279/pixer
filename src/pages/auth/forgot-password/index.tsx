import { useTranslation } from "react-i18next";

import { ForgotPasswordForm } from "@/components/auth/forget-password";
import { AuthPageLayout } from "@/components/layouts/auth-layout";
import { Routes } from "@/config/routes";
import { useRouter } from "@/hooks/useRouter";
import { getAuthCredentials, isAuthenticated } from "@/utils/auth-utils";

export function ForgotPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const { token, permissions } = getAuthCredentials();

  if (isAuthenticated({ token, permissions })) {
    router.replace(Routes.dashboard);
  }

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">{t("form-title-forgot-password")}</h3>
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
