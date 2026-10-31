import { Observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { useRootStore } from '@/contexts/root';

import { useCustomerCreateForm } from './useCustomerCreateForm';

export function CustomerCreateForm() {
  const router = useRootStore('user');
  const { t } = useTranslation();
  const { form, handleSubmit } = useCustomerCreateForm();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form-title-information')}
          details={t('customer-form-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-name')}
            {...form.register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(form.formState.errors.name?.message!)}
            required
          />
          <Input
            label={t('input-label-email')}
            {...form.register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(form.formState.errors.email?.message!)}
            required
          />
          <PasswordInput
            label={t('input-label-password')}
            {...form.register('password')}
            error={t(form.formState.errors.password?.message!)}
            variant="outline"
            className="mb-4"
            required
          />
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="mb-4 text-end">
          <Observer>
            {() => (
              <Button
                loading={router.register.isLoading}
                disabled={router.register.isLoading}
              >
                {t('button-label-create-customer')}
              </Button>
            )}
          </Observer>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
