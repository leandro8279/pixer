import React from 'react';
import { useTranslation } from 'react-i18next';

import { ShopForm } from '@/components/shop/shop-form';

export function CreateShop() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{t('form-title-create-shop')}</h1>
      </div>
      <ShopForm />
    </React.Fragment>
  );
}
