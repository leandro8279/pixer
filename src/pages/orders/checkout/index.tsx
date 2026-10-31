import { Observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { AddressGrid } from '@/components/checkout/address/address-grid';
import { ContactGrid } from '@/components/checkout/contact/contact-grid';
import { CustomerGrid } from '@/components/checkout/customer/customer-grid';
import { RightSideView } from '@/components/checkout/right-side-view';
import { ScheduleGrid } from '@/components/checkout/schedule/schedule-grid';
import { useRootStore } from '@/contexts/root';
import { AddressType } from '@/types';

export function CheckoutPage() {
  const { t } = useTranslation();
  const auth = useRootStore('auth');

  return (
    <div className="bg-gray-100">
      <div className="lg:space-s-8 m-auto flex w-full max-w-5xl flex-col items-center lg:flex-row lg:items-start">
        <div className="w-full space-y-6 lg:max-w-2xl">
          <CustomerGrid
            className="shadow-700 bg-light p-5 md:p-8"
            label={t('text-customer')}
            count={1}
          />
          <Observer>
            {() => (
              <ContactGrid
                count={1}
                label={t('text-contact-number')}
                contact={auth.me.profile?.contact}
                className="shadow-700 bg-light p-5 md:p-8"
              />
            )}
          </Observer>

          <Observer>
            {() => (
              <AddressGrid
                count={2}
                userId={auth.me.id!}
                type={AddressType.Billing}
                label={t('text-billing-address')}
                className="shadow-700 bg-light p-5 md:p-8"
                addresses={auth.me.address?.filter((address) => address?.type === AddressType.Billing)}
              />
            )}
          </Observer>

          <Observer>
            {() => (
              <AddressGrid
                count={3}
                userId={auth.me?.id!}
                type={AddressType.Shipping}
                label={t('text-shipping-address')}
                className="shadow-700 bg-light p-5 md:p-8"
                addresses={auth.me?.address?.filter((address) => address?.type === AddressType.Shipping)}
              />
            )}
          </Observer>

          <ScheduleGrid
            className="shadow-700 bg-light p-5 md:p-8"
            label={t('text-delivery-schedule')}
            count={4}
          />
        </div>

        <div className="mb-10 mt-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
          <RightSideView />
        </div>
      </div>
    </div>
  );
}
