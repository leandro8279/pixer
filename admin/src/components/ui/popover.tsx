import { useEffect } from 'react';
import { Popover } from '@headlessui/react';
import cn from 'classnames';
import { ToggleIcon, ToggleIconVertical } from '@/components/icons/toggle-icon';
import {
  offset,
  flip,
  autoUpdate,
  useFloating,
  shift,
} from '@floating-ui/react';
import RenderComponent from '@/components/common/render-component';

interface PopOverProps {
  children: any;
  popOverButtonClass?: string;
  popOverPanelClass?: string;
  iconStyle?: 'vertical' | 'horizontal';
}

export function PopOver({
  children,
  popOverButtonClass,
  popOverPanelClass,
  iconStyle = 'horizontal',
}: PopOverProps) {
  const { x, y, strategy, update, refs } = useFloating({
    strategy: 'fixed',
    placement: 'bottom',
    middleware: [offset(0), flip(), shift()],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  return (
    <Popover className="relative inline-block">
      <Popover.Button
        className={cn(
          'p-2 text-base opacity-80 transition duration-200 hover:text-heading',
          popOverButtonClass
        )}
        ref={refs.setReference}
      >
        <RenderComponent conditional={iconStyle === 'horizontal'}>
          <ToggleIcon width={20} />
        </RenderComponent>
        <RenderComponent conditional={iconStyle !== 'horizontal'}>
          <ToggleIconVertical height={18} width={6} />
        </RenderComponent>
      </Popover.Button>
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
          zIndex: 1,
        }}
      >
        <Popover.Panel
          className={cn(
            'w-[18rem] max-w-[20rem] overflow-hidden rounded bg-[#F7F8F9] px-4 shadow-translatePanel sm:px-0',
            popOverPanelClass
          )}
        >
          {children}
        </Popover.Panel>
      </div>
    </Popover>
  );
}

export default PopOver;
