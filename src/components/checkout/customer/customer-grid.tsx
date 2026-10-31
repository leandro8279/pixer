import { Observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useRootStore } from '@/contexts/root';

interface Props {
  label: string;
  count?: number;
  className?: string;
}

export function CustomerGrid(props: Props) {
  const { label, className, count } = props;
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');

  function onAddOrChange() {
    // openModal('SELECT_CUSTOMER');
  }

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="space-s-3 md:space-s-4 flex items-center">
          {count && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">{count}</span>}
          <p className="text-lg capitalize text-heading ml-2 lg:text-xl">{label}</p>
        </div>

        <button
          className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover focus:text-accent-hover focus:outline-none"
          onClick={onAddOrChange}
        >
          <PlusIcon className="me-0.5 h-4 w-4 stroke-2" />
          <Observer>
            {() => {
              checkout.customer?.value ? t('text-update') : t('text-add');
            }}
          </Observer>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Observer>
          {() => (
            <RenderComponent conditional={checkout.customer?.value}>
              <div className="group relative h-full cursor-pointer rounded border border-accent bg-light p-4 shadow-sm hover:border-accent">
                <p className="text-sm font-semibold capitalize text-heading">{checkout.customer.label}</p>
              </div>
            </RenderComponent>
          )}
        </Observer>

        <Observer>
          {() => (
            <RenderComponent conditional={!Boolean(checkout.customer?.value)}>
              <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">{t('text-no-customer')}</span>
            </RenderComponent>
          )}
        </Observer>
      </div>
    </div>
  );
}
