import React from 'react';
import { useTranslation } from 'react-i18next';

import { CreateOrUpdateTypeForm } from '@/components/group/group-form';

export function CreateTypePage() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form-title-create-type')}</h1>
      </div>
      <CreateOrUpdateTypeForm />
    </React.Fragment>
  );
}
