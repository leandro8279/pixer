import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { fadeInLeft } from '@/utils/motion/fade-in-left';
import { fadeInOut } from '@/utils/motion/fade-in-out';
import { fadeInRight } from '@/utils/motion/fade-in-right';
import { Dialog } from '@headlessui/react';

interface Props {
  children: any;
  open: boolean;
  variant?: 'left' | 'right';
  useBlurBackdrop?: boolean;
  onClose: () => void;
}

export function Drawer(props: Props) {
  const ref = useRef<any>(null);
  const { children, open = false, variant = 'right', useBlurBackdrop, onClose } = props;

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current, { allowTouchMove: () => true });
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          as={motion.div}
          open={open}
          onClose={onClose}
        >
          <motion.aside
            ref={ref}
            key="drawer"
            initial="from"
            animate="to"
            exit="from" //@ts-ignore
            variants={variant === 'right' ? fadeInRight() : fadeInLeft()}
            className="fixed inset-0 z-50 h-full overflow-hidden"
            dir={'ltr'}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial="from"
                animate="to"
                exit="from" //@ts-ignore
                variants={fadeInOut(0.35)}
                onClick={onClose}
                className={cn('absolute inset-0 bg-dark bg-opacity-40', useBlurBackdrop && 'use-blur-backdrop')}
              />
              <div
                className={cn(
                  'absolute inset-y-0 flex max-w-full outline-none',
                  variant === 'right' ? 'ltr:right-0 rtl:left-auto' : 'ltr:left-0 rtl:right-auto',
                )}
              >
                <div className="w-screen h-full max-w-md">
                  <div className="flex flex-col h-full shadow-xl bg-light text-body">{children}</div>
                </div>
              </div>
            </div>
          </motion.aside>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
