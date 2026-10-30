import { action, computed, makeObservable, observable, observableRef } from 'mobx';

import { Action, cartReducer, getItem, initialState, inStock, Item, State } from '@/utils/cart.utils';
import { CART_KEY } from '@/utils/constants';

export class CartStore {
  _state: State = initialState;
  savedCart: string = JSON.stringify(initialState);

  constructor() {
    makeObservable(this, {
      savedCart: observable,
      _state: observableRef, // o reducer sempre devolve um objeto novo

      state: computed,

      saveCart: action,
      dispatch: action,
      loadCart: action,
    });
  }

  get state() {
    return this._state;
  }

  // equivalente ao `useReducer(cartReducer, JSON.parse(savedCart!))`
  loadCart() {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      this.savedCart = raw;
      this._state = JSON.parse(raw);
    }
  }

  saveCart(value: string) {
    this.savedCart = value;

    if (typeof window === 'undefined') return;

    localStorage.setItem(CART_KEY, value);
  }

  // equivalente ao `dispatch` do useReducer
  dispatch(act: Action) {
    this._state = cartReducer(this._state, act);
    this.saveCart(JSON.stringify(this._state));
    console.log(JSON.stringify({ state: this.state }, null, 2));
  }

  isInStock(id: Item['id']) {
    return inStock(this._state.items, id);
  }

  isInCart(id: Item['id']) {
    return !!getItem(this._state.items, id);
  }

  getItemFromCart(id: Item['id']) {
    return getItem(this._state.items, id)!;
  }

  addItemToCart(item: Item, quantity: number) {
    console.log(JSON.stringify({ item, quantity }, null, 2));
    this.dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  }

  removeItemFromCart(id: Item['id']) {
    this.dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
  }

  clearItemFromCart(id: Item['id']) {
    this.dispatch({ type: 'REMOVE_ITEM', id });
  }
}
