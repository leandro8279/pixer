import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { Checkbox } from '@/components/ui/checkbox';
import { useRootStore } from '@/contexts/root';
import { usePrice } from '@/hooks/usePrice';
import { isNegative } from '@/utils/is-negative';

interface Props {
  totalPrice: number;
  walletAmount: number;
  walletCurrency: number;
}

export const Wallet = observer((props: Props) => {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');
  const { totalPrice, walletAmount, walletCurrency } = props;
  const [calculateCurrentWalletCurrency, setCalculateCurrentWalletCurrency] = useState(walletCurrency);

  const { price: payableAmount } = usePrice({ amount: checkout.payableAmount });
  const { price: currentWalletCurrency } = usePrice({ amount: Number(calculateCurrentWalletCurrency) });

  useEffect(() => {
    const dispose = reaction(
      () => checkout.useWallet,
      (useWallet) => {
        if (useWallet) {
          const calculatedCurrentWalletCurrencyAfterPayment = walletCurrency - totalPrice;
          if (isNegative(calculatedCurrentWalletCurrencyAfterPayment)) {
            setCalculateCurrentWalletCurrency(0);
            checkout.setPayableAmount(Math.abs(calculatedCurrentWalletCurrencyAfterPayment));
          } else {
            setCalculateCurrentWalletCurrency(calculatedCurrentWalletCurrencyAfterPayment);
            checkout.setPayableAmount(0);
          }
        } else {
          setCalculateCurrentWalletCurrency(walletCurrency);
          checkout.setPayableAmount(0);
        }
      },
    );

    return () => dispose();
  }, [totalPrice]);

  return (
    <div>
      <div className="mt-2 space-y-2">
        {/* <p>Wallet</p> */}
        <div className="flex justify-between text-sm text-body">
          <span>
            {t('text-wallet')} <span className="lowercase">{t('text-points')}</span>
          </span>
          <span>{walletAmount}</span>
        </div>
        <div className="flex justify-between text-sm text-body">
          <span>
            {t('text-wallet')} {t('text-currency')}
          </span>
          <span>{currentWalletCurrency}</span>
        </div>
      </div>

      <Checkbox
        name="use_wallet"
        label={t('text-wallet-use')}
        className="mt-3"
        checked={checkout.useWallet}
        disabled={!walletAmount}
        onChange={(value) => checkout.setUseWallet(value.target.value as any)}
      />

      <RenderComponent conditional={checkout.useWallet}>
        <div className="mt-4 flex justify-between border-t-4 border-double border-border-base pt-3">
          <span className="text-base font-semibold text-heading">{t('text-payable')}</span>
          <span className="text-base font-semibold text-heading">{payableAmount}</span>
        </div>
      </RenderComponent>
    </div>
  );
});
