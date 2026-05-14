import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/components/auth/login-form';
import { AuthLayout } from '@/components/layouts/auth-layout';

import { useRouter } from 'wouter';

export function LoginPage() {
  const { t } = useTranslation('common');

  const router = useRouter();
  // const { token, permissions } = getAuthCredentials();
  // if (isAuthenticated({ token, permissions })) {
  //   router.replace(Routes.dashboard);
  // }

  return (
    <AuthLayout>
      <h3 className='mb-6 mt-4 text-center text-base italic text-body'>{t('admin-login-title')}</h3>
      <LoginForm />
    </AuthLayout>
  );
}
