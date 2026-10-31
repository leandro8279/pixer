import React from 'react';
import { useTranslation } from 'react-i18next';

import { CustomerCreateForm } from '@/components/user/user-form';

export function CreateUserPage() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form:form-title-create-customer')}</h1>
      </div>
      <CustomerCreateForm />
    </React.Fragment>
  );
}
