import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { reaction } from 'mobx';
import { useLocation } from 'wouter';

import { RegistrationForm } from '@/components/auth/registration-form';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { useRootStore } from '@/contexts/root-context';
import { Routes } from '@/config/routes';

export function RegisterPage() {
  const { t } = useTranslation('common');
  const { auth } = useRootStore();
  const [, navigate] = useLocation();

  useEffect(() => {
    const dispose = reaction(
      () => auth.isAuthenticated,
      (isAuthenticated, previousIsAuthenticated) => {
        if (isAuthenticated && !previousIsAuthenticated) {
          navigate(Routes.dashboard);
        }
      },
      { fireImmediately: true },
    );

    return dispose;
  }, [auth, navigate]);

  return (
    <AuthLayout>
      <h3 className='mb-6 mt-4 text-center text-base italic'>{t('admin-register-title')}</h3>
      <RegistrationForm />
    </AuthLayout>
  );
}
