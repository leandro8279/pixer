import { useTranslation } from 'react-i18next';

import { RegistrationForm } from '@/components/auth/registration-form';
import { AuthLayout } from '@/components/layouts/auth-layout';

export function RegisterPage() {
  // const router = useRouter();
  // const { token, permissions } = getAuthCredentials();
  // if (isAuthenticated({ token, permissions })) {
  //   router.replace(Routes.dashboard);
  // }
  const { t } = useTranslation('common');
  return (
    <AuthLayout>
      <h3 className='mb-6 mt-4 text-center text-base italic'>{t('admin-register-title')}</h3>
      <RegistrationForm />
    </AuthLayout>
  );
}
