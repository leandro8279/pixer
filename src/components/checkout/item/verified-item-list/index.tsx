import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Coupon } from '@/components/checkout/coupon';
import { PaymentGrid } from '@/components/checkout/payment/payment-grid';
import { PlaceOrderAction } from '@/components/checkout/place-order-action';
import { Wallet } from '@/components/checkout/wallet';
import { RenderComponent } from '@/components/common/render-component';
import { CloseIcon } from '@/components/icons/close-icon';
import { EmptyCartIcon } from '@/components/icons/empty-cart';
import { useRootStore } from '@/contexts/root';
import { usePrice } from '@/hooks/usePrice';
import { CouponType } from '@/types';
import { calculatePaidTotal, calculateTotal } from '@/utils/cart.utils';

import { ItemCard } from '../item-card';
import { ItemInfoRow } from '../item-info-row';

interface Props {
  className?: string;
}

export const VerifiedItemList = observer(({ className }: Props) => {
  let calculateDiscount = 0;
  const { t } = useTranslation();
  const cart = useRootStore('cart');
  const checkout = useRootStore('checkout');
  const setting = useRootStore('setting');
  const { price: discountPrice } = usePrice(checkout.coupon && { amount: Number(calculateDiscount) });
  const available_items = cart.state.items.filter((item) => !checkout.verifiedResponse?.unavailable_products?.includes(item.id));
  const base_amount = calculateTotal(available_items);
  const { price: sub_total } = usePrice(checkout.verifiedResponse && { amount: base_amount });

  switch (checkout.coupon?.type) {
    case CouponType.PERCENTAGE:
      calculateDiscount = (base_amount * Number(checkout.coupon.amount)) / 100;
      break;
    case CouponType.FREE_SHIPPING:
      calculateDiscount = checkout.verifiedResponse ? checkout.verifiedResponse.shipping_charge : 0;
      break;
    default:
      calculateDiscount = Number(checkout.coupon.amount);
  }

  const totalPrice =
    checkout.verifiedResponse ?
      calculatePaidTotal(
        {
          totalAmount: base_amount,
          tax: checkout.verifiedResponse?.total_tax,
          shipping_charge: checkout.verifiedResponse?.shipping_charge,
        },
        Number(calculateDiscount),
      )
    : 0;

  const { price: total } = usePrice(checkout.verifiedResponse && { amount: totalPrice <= 0 ? 0 : totalPrice });
  const { price: shipping } = usePrice(checkout.verifiedResponse && { amount: checkout.verifiedResponse.shipping_charge ?? 0 });
  const { price: tax } = usePrice(checkout.verifiedResponse && { amount: checkout.verifiedResponse.total_tax ?? 0 });

  let freeShippings = setting.settings?.options?.freeShipping && Number(setting.settings?.options?.freeShippingAmount) <= base_amount;

  return (
    <div className={className}>
      <div className="mb-4 flex flex-col items-center space-s-4">
        <span className="text-base font-bold text-heading">{t('text-your-order')}</span>
      </div>
      <div className="flex flex-col border-b border-border-200 pb-2">
        <RenderComponent conditional={!cart.state.isEmpty}>
          {cart.state.items?.map((item) => {
            const notAvailable = checkout.verifiedResponse?.unavailable_products?.find((d: any) => d === item.id);
            return (
              <ItemCard
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
              />
            );
          })}
        </RenderComponent>

        <RenderComponent conditional={!Boolean(!cart.state.isEmpty)}>
          <EmptyCartIcon />
        </RenderComponent>
      </div>

      <div className="mt-4 space-y-2">
        <ItemInfoRow
          title={t('text-sub-total')}
          value={sub_total}
        />
        <ItemInfoRow
          title={t('text-tax')}
          value={tax}
        />
        <div className="flex justify-between">
          <p className="text-sm text-body">
            {t('text-shipping')} <span className="text-xs font-semibold text-accent">{freeShippings && `(${t('text-free-shipping')})`}</span>
          </p>
          <span className="text-sm text-body"> {shipping}</span>
        </div>

        <RenderComponent conditional={checkout.coupon?.amount}>
          <div className="flex justify-between">
            <p className="flex items-center gap-1 text-sm text-body me-2">
              {t('text-discount')}{' '}
              <span className="-mt-px text-xs font-semibold text-accent">
                {checkout.coupon?.type === CouponType.FREE_SHIPPING && `(${t('text-free-shipping')})`}
              </span>
            </p>
            <span className="flex items-center text-xs font-semibold text-red-500 me-auto">
              ({checkout.coupon?.code})
              <button onClick={() => checkout.setCoupon({} as any)}>
                <CloseIcon className="h-3 w-3 ms-2" />
              </button>
            </span>
            <span className="flex items-center gap-1 text-sm text-body">
              <RenderComponent conditional={calculateDiscount > 0}>
                <span className="-mt-0.5">-</span>{' '}
              </RenderComponent>
              {discountPrice}
            </span>
          </div>
        </RenderComponent>

        <RenderComponent conditional={!Boolean(checkout.coupon?.amount)}>
          <div className="mt-5 mb-4! flex justify-between">
            <Coupon subtotal={base_amount} />
          </div>
        </RenderComponent>
        <div className="flex justify-between border-t-4 border-double border-border-200 pt-3">
          <p className="text-base font-semibold text-heading">{t('text-total')}</p>
          <span className="text-base font-semibold text-heading">{total}</span>
        </div>
      </div>
      <RenderComponent conditional={checkout.verifiedResponse}>
        <Wallet
          totalPrice={totalPrice}
          walletAmount={checkout.verifiedResponse.wallet_amount}
          walletCurrency={checkout.verifiedResponse.wallet_currency}
        />
      </RenderComponent>
      {checkout.useWallet && !Boolean(checkout.payableAmount) ? null : <PaymentGrid className="mt-10 border border-gray-200 bg-light p-5" />}
      <PlaceOrderAction>{t('text-place-order')}</PlaceOrderAction>
    </div>
  );
});
