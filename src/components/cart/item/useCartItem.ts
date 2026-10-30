import { useRootStore } from '@/contexts/root';

export const useCartItem = (item: any) => {
  const cart = useRootStore('cart');

  function handleIncrement(e: any) {
    e.stopPropagation();
    cart.addItemToCart(item, 1);
  }

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    cart.removeItemFromCart(item.id);
  };

  return { handleIncrement, handleRemoveClick };
};
