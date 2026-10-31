import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { EmptyCartIcon } from '@/components/icons/empty-cart';
import { useRootStore } from '@/contexts/root';
import { usePrice } from '@/hooks/usePrice';

import { CheckAvailabilityAction } from '../check-availability-action';
import { ItemCard } from './item-card';
import { ItemInfoRow } from './item-info-row';

export const UnverifiedItemList = observer(() => {
  const { t } = useTranslation();
  const cart = useRootStore('cart');
  const { price: subtotal } = usePrice(cart.state.items && { amount: cart.state.total });

  return (
    <div className="w-full">
      <div className="space-s-4 mb-4 flex flex-col items-center">
        <span className="text-base font-bold text-heading">{t('text-your-order')}</span>
      </div>
      <div className="flex flex-col border-b border-border-200 py-3">
        <RenderComponent conditional={cart.state.isEmpty}>
          <div className="mb-4 flex h-full flex-col items-center justify-center">
            <EmptyCartIcon
              width={140}
              height={176}
            />
            <h4 className="mt-6 text-base font-semibold">{t('text-no-products')}</h4>
          </div>
        </RenderComponent>
        <RenderComponent conditional={!cart.state.isEmpty}>
          {cart.state.items.map((item) => (
            <ItemCard
              item={item}
              key={item.id}
            />
          ))}
        </RenderComponent>
      </div>
      <div className="mt-4 space-y-2">
        <ItemInfoRow
          title={t('text-sub-total')}
          value={subtotal}
        />
        <ItemInfoRow
          title={t('text-tax')}
          value={t('text-calculated-checkout')}
        />
        <ItemInfoRow
          title={t('text-estimated-shipping')}
          value={t('text-calculated-checkout')}
        />
      </div>
      <CheckAvailabilityAction>{t('text-check-availability')}</CheckAvailabilityAction>
    </div>
  );
});
