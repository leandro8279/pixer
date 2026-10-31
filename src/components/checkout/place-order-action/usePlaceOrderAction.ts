import { isEmpty } from 'lodash';
import { reaction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '@/contexts/root';

export const usePlaceOrderAction = () => {
  const checkout = useRootStore('checkout');
  const store = useLocalObservable(() => ({
    errorMessage: '',
    isAllRequiredFieldSelected: false,
    setErrorMessage(value: string) {
      this.errorMessage = value;
    },
    setIsAllRequiredFieldSelected(value: boolean) {
      this.isAllRequiredFieldSelected = value;
    },
  }));

  useEffect(() => {
    const dispose = reaction(
      () => [
        checkout.customer,
        checkout.customerContact,
        checkout.paymentGateway,
        checkout.billingAddress,
        checkout.shippingAddress,
        checkout.deliveryTime,
        checkout.availableItems,
      ],
      (values) => {
        store.setIsAllRequiredFieldSelected(values.every((v) => !isEmpty(v)));
      },
      { fireImmediately: true },
    );

    return dispose;
  }, [checkout, store]);

  function handlePlaceOrder() {
    alert('handlePlaceOrder');
  }

  return { store, handlePlaceOrder };
};
