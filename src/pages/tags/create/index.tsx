import React from 'react';
import { useTranslation } from 'react-i18next';

import { CreateOrUpdateTagForm } from '@/components/tag/tag-form';

export function CreateTagPage() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-gray-300 pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form:button-label-add-tag')}</h1>
      </div>
      <CreateOrUpdateTagForm />
    </React.Fragment>
  );
}
