import React from 'react';
import { useTranslation } from 'react-i18next';

import { CreateOrUpdateTaxForm } from '@/components/tax/tax-form';

export function CreateTaxePage() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form:form-title-create-tax')}</h1>
      </div>
      <CreateOrUpdateTaxForm />
    </React.Fragment>
  );
}
