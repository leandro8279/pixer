import { observer } from 'mobx-react-lite';
import React from 'react';

import { AddToCartBtn } from '@/components/cart/add-to-cart/add-to-cart-btn';
import { RenderComponent } from '@/components/common/render-component';
import { Counter } from '@/components/ui/counter';
import { generateCartItem } from '@/contexts/quick-cart/generate-cart-item';
import { useRootStore } from '@/contexts/root';

import { useAddToCart } from './useAddToCart';

interface Props {
  data: any;
  variant?: 'helium' | 'neon' | 'argon' | 'oganesson' | 'single' | 'big';
  counterVariant?: 'helium' | 'neon' | 'argon' | 'oganesson' | 'single' | 'details';
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = observer((props: Props) => {
  const cart = useRootStore('cart');
  const { data, variant = 'helium', counterVariant, counterClass, variation, disabled } = props;
  const item = generateCartItem(data, variation);

  const { handleAddClick, handleRemoveClick } = useAddToCart(item);

  const outOfStock = cart.isInCart(item?.id) && !cart.isInStock(item.id);

  return (
    <React.Fragment>
      <RenderComponent conditional={!cart.isInCart(item?.id)}>
        <AddToCartBtn
          variant={variant}
          onClick={handleAddClick}
          disabled={disabled || outOfStock}
        />
      </RenderComponent>

      <RenderComponent conditional={!Boolean(!cart.isInCart(item?.id))}>
        <Counter
          disabled={outOfStock}
          className={counterClass}
          onIncrement={handleAddClick}
          onDecrement={handleRemoveClick}
          variant={counterVariant || variant}
          value={cart.getItemFromCart(item.id)?.quantity || 0}
        />
      </RenderComponent>
    </React.Fragment>
  );
});
