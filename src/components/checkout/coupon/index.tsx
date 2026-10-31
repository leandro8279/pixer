import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRootStore } from '@/contexts/root';

import { useCoupon } from './useCoupon';

interface Props {
  subtotal: number;
}

export const Coupon = observer(({ subtotal }: Props) => {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');
  const { form, hasCoupon, setHasCoupon, handleSubmit } = useCoupon();

  if (!hasCoupon && !checkout.coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold transition duration-200 text-body hover:text-accent"
        onClick={() => setHasCoupon(true)}
      >
        {t('text-have-coupon')}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col w-full pt-1 sm:flex-row"
    >
      <Input
        {...form.register('code', { required: 'text-coupon-required' })}
        placeholder={t('text-enter-coupon')}
        variant="outline"
        className="flex-1 mb-4 sm:me-4 sm:mb-0"
        dimension="small"
        showLabel={false}
        error={t(form.formState.errors?.code?.message!)}
      />
      <Button
        loading={false}
        disabled={false}
        size="small"
        className="w-full sm:w-40 lg:w-auto mt-0.5"
      >
        {t('text-apply')}
      </Button>
    </form>
  );
});
