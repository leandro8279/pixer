import { useTranslation } from 'react-i18next';
import { Redirect } from 'wouter';

import { ForgotPasswordForm } from '@/components/auth/forget-password';
import { AuthPageLayout } from '@/components/layouts/auth-layout';
import { Routes } from '@/config/routes';
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils';

export function ForgotPassword() {
  const { t } = useTranslation();

  const { token, permissions } = getAuthCredentials();

  if (isAuthenticated({ token, permissions })) {
    return <Redirect to={Routes.dashboard} />;
  }

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">{t('form-title-forgot-password')}</h3>
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
