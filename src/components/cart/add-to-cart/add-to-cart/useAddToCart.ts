import { useRootStore } from '@/contexts/root';
import { cartAnimation } from '@/utils/cart-animation';

interface Props {
  id: any;
  name: any;
  slug: any;
  unit: any;
  is_digital: any;
  image: any;
  stock?: any;
  price: any;
  productId?: any;
  variationId?: any;
}

export const useAddToCart = (item: Props) => {
  const cart = useRootStore('cart');

  function handleAddClick(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.stopPropagation();
    cart.addItemToCart(item, 1);

    if (!cart.isInCart(item.id)) {
      cartAnimation(e);
    }
  }

  function handleRemoveClick(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.stopPropagation();
    cart.removeItemFromCart(item.id);
  }

  return { handleRemoveClick, handleAddClick };
};
