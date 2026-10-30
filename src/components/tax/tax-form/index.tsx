import { Observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/common/card';
import { RenderComponent } from '@/components/common/render-component';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { Input } from '@/components/ui/input';
import { StickyFooterPanel } from '@/components/ui/sticky-footer-panel';
import { useRootStore } from '@/contexts/root';
import { useRouter } from '@/hooks/useRouter';
import { Tax } from '@/types';

import { useCreateOrUpdateTaxForm } from './useCreateOrUpdateTaxForm';

interface Props {
  initialValues?: Tax;
}

export function CreateOrUpdateTaxForm({ initialValues }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const taxe = useRootStore('taxe');

  const { form, handleSubmit } = useCreateOrUpdateTaxForm(initialValues);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form-title-information')}
          details={`${initialValues ? t('item-description-update') : t('item-description-add')} ${t('tax-form-info-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('input-label-name')}
            {...form.register('name', { required: 'Name is required' })}
            error={t(form.formState.errors.name?.message!)}
            variant="outline"
            className="mb-5"
            required
          />
          <Input
            label={t('input-label-rate')}
            {...form.register('rate')}
            type="number"
            error={t(form.formState.errors.rate?.message!)}
            variant="outline"
            className="mb-5"
            required
          />
          <Input
            label={t('input-label-country')}
            {...form.register('country')}
            error={t(form.formState.errors.country?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('input-label-city')}
            {...form.register('city')}
            error={t(form.formState.errors.city?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('input-label-state')}
            {...form.register('state')}
            error={t(form.formState.errors.state?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('input-label-zip')}
            {...form.register('zip')}
            error={t(form.formState.errors.zip?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>

      <StickyFooterPanel className="z-0">
        <div className="text-end">
          <RenderComponent conditional={initialValues}>
            <Button
              variant="outline"
              onClick={router.back}
              className="text-sm me-4 md:text-base"
              type="button"
            >
              {t('button-label-back')}
            </Button>
          </RenderComponent>

          <Observer>
            {() => (
              <Button
                loading={taxe.create.isLoading || taxe.update.isLoading}
                disabled={taxe.create.isLoading || taxe.update.isLoading}
                className="text-sm md:text-base"
              >
                {initialValues ? t('button-label-update') : t('button-label-add')} {t('button-label-tax')}
              </Button>
            )}
          </Observer>
        </div>
      </StickyFooterPanel>
    </form>
  );
}
