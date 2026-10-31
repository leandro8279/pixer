import classNames from 'classnames';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { Alert } from '@/components/ui/alert';
import { useRootStore } from '@/contexts/root';
import { PaymentMethodName } from '@/types';
import { Label, Radio, RadioGroup } from '@headlessui/react';

import { CashPayment } from './cash';
import { CashOnDelivery } from './cash-on-delivery';

interface PaymentMethodInformation {
  name: string;
  value: PaymentMethodName;
  icon: string;
  component: React.FunctionComponent;
}

const AVAILABLE_PAYMENT_METHODS_MAP: Record<PaymentMethodName, PaymentMethodInformation> = {
  CASH: {
    name: 'common:payment-cash',
    value: 'CASH',
    icon: '',
    component: CashPayment,
  },
  CASH_ON_DELIVERY: {
    name: 'common:text-cash-on-delivery',
    value: 'CASH_ON_DELIVERY',
    icon: '',
    component: CashOnDelivery,
  },
};

interface Props {
  className?: string;
}
export const PaymentGrid = observer(({ className }: Props) => {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');
  const store = useLocalObservable(() => ({
    errorMessage: '',
    setErrorMessage: (value: string) => (store.errorMessage = value),
  }));

  const PaymentMethod = AVAILABLE_PAYMENT_METHODS_MAP[checkout.paymentGateway];

  const Component = PaymentMethod.component ?? CashOnDelivery;
  return (
    <div className={className}>
      <RenderComponent conditional={store.errorMessage}>
        <Alert
          message={t(`${store.errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => store.setErrorMessage('')}
        />
      </RenderComponent>

      <RadioGroup
        value={checkout.paymentGateway}
        onChange={checkout.setPaymentGateway}
      >
        <Label className="mb-5 block text-base font-semibold text-heading">{t('text-choose-payment')}</Label>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {Object.values(AVAILABLE_PAYMENT_METHODS_MAP).map(({ name, icon, value }) => (
            <Radio
              value={value}
              key={value}
            >
              {({ checked }) => (
                <div
                  className={classNames(
                    'relative flex h-full w-full cursor-pointer items-center justify-center rounded border py-3 text-center',
                    checked ? 'shadow-600 border-accent bg-light' : 'border-gray-200 bg-light',
                  )}
                >
                  <RenderComponent conditional={icon}>
                    <img
                      src={icon}
                      alt={t(name)}
                      className="h-7.5"
                    />
                  </RenderComponent>

                  <RenderComponent conditional={!icon}>
                    <span className="text-xs font-semibold text-heading">{t(name)}</span>
                  </RenderComponent>
                </div>
              )}
            </Radio>
          ))}
        </div>
      </RadioGroup>

      <div>
        <Component />
      </div>
    </div>
  );
});
