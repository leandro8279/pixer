import { makeAutoObservable } from 'mobx';

import { Address, PaymentMethodName } from '@/types';

interface Coupon {
  code: string;
  type: string;
  amount: number;
}

interface Customer {
  value: string;
  label: string;
}
export class CheckoutStore {
  _state = {
    customer: {} as Customer,
    useWallet: false,
    payableAmount: 0,
    deliveryTime: {},
    availableItems: [],
    customerContact: '',
    billingAddress: {} as Address,
    shippingAddress: {} as Address,
    verifiedResponse: null as any,
    coupon: {} as Coupon,
    paymentGateway: 'CASH' as PaymentMethodName,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get customer() {
    return this._state.customer;
  }

  get customerContact() {
    return this._state.customerContact;
  }

  get billingAddress() {
    return this._state.billingAddress;
  }

  get shippingAddress() {
    return this._state.shippingAddress;
  }

  get deliveryTime() {
    return this._state.deliveryTime;
  }

  get verifiedResponse() {
    return this._state.verifiedResponse;
  }

  get coupon() {
    return this._state.coupon;
  }

  get useWallet() {
    return this._state.useWallet;
  }

  get payableAmount() {
    return this._state.payableAmount;
  }

  get paymentGateway() {
    return this._state.paymentGateway;
  }

  get availableItems() {
    return this._state.availableItems;
  }

  setCustomerContact(value: string) {
    alert(JSON.stringify(value, null, 2));
    this._state.customerContact = value;
  }

  setBillingAddress(value: Address) {
    alert(JSON.stringify(value, null, 2));
    this._state.billingAddress = value;
  }

  setShippingAddress(value: Address) {
    alert(JSON.stringify(value, null, 2));
    this._state.shippingAddress = value;
  }

  setDeliveryTime(value: any) {
    alert(JSON.stringify(value, null, 2));
    this._state.deliveryTime = value;
  }

  setCoupon(value: Coupon) {
    this._state.coupon = value;
  }

  setUseWallet(value: boolean) {
    this._state.useWallet = value;
  }

  setPayableAmount(value: number) {
    this._state.payableAmount = value;
  }

  setPaymentGateway(value: PaymentMethodName) {
    this._state.paymentGateway = value;
  }
}
