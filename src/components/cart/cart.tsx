import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { CartCheckBagIcon } from '@/components/icons/cart-check-bag';
import { CloseIcon } from '@/components/icons/close-icon';
import { EmptyCartIcon } from '@/components/icons/empty-cart';
import { Routes } from '@/config/routes';
import { useRootStore } from '@/contexts/root';
import { usePrice } from '@/hooks/usePrice';
import { useRouter } from '@/hooks/useRouter';
import { formatString } from '@/utils/format-string';
import { fadeInOut } from '@/utils/motion/fade-in-out';

import { CartItem } from './item';

export const Cart = observer(() => {
  const router = useRouter();
  const app = useRootStore('app');
  const cart = useRootStore('cart');
  const { t } = useTranslation();

  function handleCheckout() {
    // const regularCheckout = items.find((item) => item.is_digital === false);
    // if (regularCheckout) {
    router.push(Routes.checkout);
    // } else {
    // router.push(ROUTES.CHECKOUT_DIGITAL);
    // }

    // closeSidebar({ display: false, view: '' });
  }

  const { price: totalPrice } = usePrice({ amount: cart.state.total });

  return (
    <section className="relative flex h-full flex-col bg-white">
      <header className="fixed top-0 z-10 flex h-16 w-full max-w-md items-center justify-between border-b border-border-200 border-opacity-75 bg-light px-6">
        <div className="flex font-semibold text-accent">
          <CartCheckBagIcon
            className="shrink-0"
            width={24}
            height={22}
          />
          <span className="flex ms-2">{formatString(cart.state.totalUniqueItems, t('text-item'))}</span>
        </div>
        <button
          onClick={() => app.closeCartSidebar()}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-muted transition-all duration-200 -me-2 ms-3 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-none"
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="h-3 w-3" />
        </button>
      </header>
      {/* End of cart header */}

      <motion.div
        layout
        className="grow pb-20"
      >
        <RenderComponent conditional={cart.state.items.length > 0}>
          {cart.state.items.map((item) => (
            <CartItem
              item={item}
              key={item.id}
            />
          ))}
        </RenderComponent>

        <RenderComponent conditional={!Boolean(cart.state.items.length > 0)}>
          <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25) as any}
            className="flex h-full flex-col items-center justify-center"
          >
            <EmptyCartIcon className="h-28 w-28 text-accent-300" />
            <h4 className="mt-6 text-base font-semibold">{t('text-no-products')}</h4>
          </motion.div>
        </RenderComponent>
      </motion.div>
      {/* End of cart items */}

      <footer className="fixed bottom-0 z-10 w-full max-w-md bg-light px-6 py-5">
        <button
          className="shadow-700 flex h-12 w-full justify-between rounded-full bg-accent p-1 text-sm font-bold transition-colors hover:bg-accent-hover focus:bg-accent-hover focus:outline-none md:h-14"
          onClick={handleCheckout}
        >
          <span className="flex h-full flex-1 items-center px-5 text-light">{t('text-checkout')}</span>
          <span className="flex h-full shrink-0 items-center rounded-full bg-light px-5 text-accent">{totalPrice}</span>
        </button>
      </footer>
    </section>
  );
});
