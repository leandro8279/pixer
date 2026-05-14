import React from 'react';
import { useTranslation } from 'react-i18next';

import RenderComponent from '@/components/common/render-component';
import Alert from '@/components/ui/alert';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';

import { Routes } from '@/config/routes';

import { Link } from 'wouter';

import { useRegistrationForm } from './useRegistrationForm';

export function RegistrationForm() {
  const { t } = useTranslation();
  const { handleSubmit, register, errors, store } = useRegistrationForm();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label={t('form:input-label-name')}
          {...register('name')}
          variant='outline'
          className='mb-4'
          error={t(errors?.name?.message || '')}
        />
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
          {...register('password')}
          error={t(errors?.password?.message || '')}
          variant='outline'
          className='mb-4'
        />
        <Button className='w-full' loading={false} disabled={false}>
          {t('form:text-register')}
        </Button>

        <RenderComponent conditional={store.errorMessage}>
          <Alert
            message={t(store.errorMessage)}
            variant='error'
            closeable={true}
            className='mt-5'
            onClose={() => store.setErrorMessage(null)}
          />
        </RenderComponent>
      </form>
      <div className='relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-11 sm:mb-8'>
        <hr className='w-full' />
        <span className='inset-s-2/4 -ms-4 absolute -top-2.5 bg-light px-2'>{t('common:text-or')}</span>
      </div>
      <div className='text-sm text-center text-body sm:text-base'>
        {t('form:text-already-account')}{' '}
        <Link
          href={Routes.login}
          className='font-semibold underline transition-colors duration-200 ms-1 text-accent hover:text-accent-hover hover:no-underline focus:text-accent-700 focus:no-underline focus:outline-none'
        >
          {t('form:button-label-login')}
        </Link>
      </div>
    </React.Fragment>
  );
}
