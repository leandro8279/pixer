import React from 'react';
import { useTranslation } from 'react-i18next';

import RenderComponent from '@/components/common/render-component';
import { Form } from '@/components/forms/form';
import Alert from '@/components/ui/alert';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from '@/components/ui/link';
import PasswordInput from '@/components/ui/password-input';

import { Routes } from '@/config/routes';

import { Observer } from 'mobx-react-lite';

import { loginFormSchema } from './loginFormSchema';
import { useLoginForm } from './useLoginForm';

import type { LoginInput } from '@/types';

export function LoginForm() {
  const { t } = useTranslation();
  const { store, handleSubmit } = useLoginForm();

  return (
    <React.Fragment>
      <Form<LoginInput> validationSchema={loginFormSchema} onSubmit={handleSubmit}>
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={t('form:input-label-email')}
              {...register('email')}
              type='email'
              variant='outline'
              className='mb-4'
              error={t(errors?.email?.message || '')}
            />
            <PasswordInput
              label={t('form:input-label-password')}
              forgotPassHelpText={t('form:input-forgot-password-label')}
              {...register('password')}
              error={t(errors?.password?.message || '')}
              variant='outline'
              className='mb-4'
              forgotPageLink={Routes.forgotPassword}
            />
            <Button className='w-full' loading={false} disabled={false}>
              {t('form:button-label-login')}
            </Button>

            <div className='relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8'>
              <hr className='w-full' />
              <span className='absolute -top-2.5 bg-light px-2 -ms-4 inset-s-2/4'>{t('common:text-or')}</span>
            </div>

            <div className='text-center text-sm text-body sm:text-base'>
              {t('form:text-no-account')}{' '}
              <Link
                href={Routes.register}
                className='font-semibold text-accent underline transition-colors duration-200 ms-1 hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none'
              >
                {t('form:link-register-shop-owner')}
              </Link>
            </div>
          </>
        )}
      </Form>
      <Observer>
        {() => (
          <RenderComponent conditional={store.errorMessage}>
            <Alert
              variant='error'
              closeable={true}
              className='mt-5'
              message={t(store.errorMessage)}
              onClose={() => store.setErrorMessage('')}
            />
          </RenderComponent>
        )}
      </Observer>
    </React.Fragment>
  );
}
