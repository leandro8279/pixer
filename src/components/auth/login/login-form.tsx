import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

import { RenderComponent } from '@/components/common/render-component';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';

import { useLoginForm } from './useLoginForm';

export function LoginForm() {
  const state = useLoginForm();
  const { t } = useTranslation();
  const auth = useRootStore('auth');

  return (
    <React.Fragment>
      <form onSubmit={state.handleSubmit}>
        <Input
          type="email"
          variant="outline"
          className="mb-4"
          {...state.register('email')}
          label={t('input-label-email')}
          error={t(state.errors.email?.message || '')}
        />
        <PasswordInput
          variant="outline"
          className="mb-4"
          {...state.register('password')}
          label={t('input-label-password')}
          forgotPageLink={Routes.forgotPassword}
          error={t(state.errors?.password?.message || '')}
          forgotPassHelpText={t('input-forgot-password-label')}
        />
        <Observer>
          {() => (
            <Button
              className="w-full"
              loading={auth.login.isLoading}
              disabled={auth.login.isLoading}
            >
              {t('button-label-login')}
            </Button>
          )}
        </Observer>

        <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute -top-2.5 bg-light px-2 -ms-4 inset-s-2/4">{t('common:text-or')}</span>
        </div>

        <div className="text-center text-sm text-body sm:text-base">
          {t('text-no-account')}{' '}
          <Link
            href={Routes.register}
            className="font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none"
          >
            {t('link-register-shop-owner')}
          </Link>
        </div>
      </form>
      <Observer>
        {() => (
          <RenderComponent conditional={auth.errorMessage}>
            <Alert
              variant="error"
              closeable={true}
              className="mt-5"
              message={t(auth.errorMessage || '')}
              onClose={() => auth.setErrorMessage('')}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
