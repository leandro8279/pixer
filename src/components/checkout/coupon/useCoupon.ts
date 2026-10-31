import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useCoupon = () => {
  const form = useForm({ defaultValues: { code: '' } });
  const [hasCoupon, setHasCoupon] = useState(false);

  function onSubmit({ code }: { code: string }) {
    // verifyCoupon(
    //   {
    //     code: code,
    //     sub_total: subtotal,
    //   },
    //   {
    //     onSuccess: (data: any) => {
    //       if (data?.is_valid) {
    //         //@ts-ignore
    //         applyCoupon(data?.coupon);
    //         setHasCoupon(false);
    //         return;
    //       }
    //       if (!data?.is_valid) {
    //         setError('code', {
    //           type: 'manual',
    //           message: t(`common:${data?.message}`),
    //         });
    //       }
    //     },
    //   },
    // );
    alert('onSubmit');
  }

  return { form, hasCoupon, setHasCoupon, handleSubmit: form.handleSubmit(onSubmit) };
};
