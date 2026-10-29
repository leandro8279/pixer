import React from 'react';
import { useTranslation } from 'react-i18next';

import { CreateOrUpdateCategoriesForm } from '@/components/category/category-form';

export function CreateCategoryPage() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form-title-create-category')}</h1>
      </div>
      <CreateOrUpdateCategoriesForm />
    </React.Fragment>
  );
}
