import { reaction } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AddressCard } from '@/components/address/address-card';
import { AddressHeader } from '@/components/address/address-header';
import { RenderComponent } from '@/components/common/render-component';
import { useRootStore } from '@/contexts/root';
import { Address, AddressType } from '@/types';
import { Label, Radio, RadioGroup } from '@headlessui/react';

interface Props {
  addresses: Address[];
  label: string;
  className?: string;
  userId: string;
  count: number;
  type: string;
}

export function AddressGrid(props: Props) {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');
  const { addresses, label, className, userId, count, type } = props;

  useEffect(() => {
    const dispose = reaction(
      () => (type === AddressType.Shipping ? checkout.shippingAddress : checkout.billingAddress),
      (address) => {
        if (addresses?.length) {
          if (address?.id) {
            const index = addresses.findIndex((a) => a.id === address.id);

            if (type === AddressType.Shipping) {
              checkout.setShippingAddress(addresses[index]);
            } else {
              checkout.setBillingAddress(addresses[index]);
            }
          } else {
            if (type === AddressType.Shipping) {
              checkout.setShippingAddress(addresses?.[0]);
            } else {
              checkout.setBillingAddress(addresses?.[0]);
            }
          }
        }
      },
    );

    return () => dispose();
  }, [addresses, addresses?.length, checkout, type]);

  function onAdd() {
    // openModal('ADD_OR_UPDATE_ADDRESS', { customerId: userId, type });
  }
  return (
    <div className={className}>
      <AddressHeader
        onAdd={onAdd}
        count={count}
        label={label}
      />

      <RenderComponent conditional={addresses && addresses?.length}>
        <Observer>
          {() => (
            <RadioGroup
              value={type === AddressType.Shipping ? checkout.shippingAddress : checkout.billingAddress}
              onChange={type === AddressType.Shipping ? checkout.setShippingAddress : checkout.setBillingAddress}
            >
              <Label className="sr-only">{label}</Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {[{}, {}].map((address: any) => (
                  <Radio
                    value={address}
                    key={address.id}
                  >
                    {({ checked }) => (
                      <AddressCard
                        checked={checked}
                        address={address}
                        userId={userId}
                      />
                    )}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          )}
        </Observer>
      </RenderComponent>

      <RenderComponent conditional={!Boolean(addresses && addresses?.length)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">{t('text-no-address')}</span>
        </div>
      </RenderComponent>
    </div>
  );
}
