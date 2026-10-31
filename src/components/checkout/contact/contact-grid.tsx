import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { PlusIcon } from '@/components/icons/plus-icon';
import { ContactCard } from '@/components/ui/contact-card';
import { useRootStore } from '@/contexts/root';

interface Props {
  contact: string | undefined;
  label: string;
  count?: number;
  className?: string;
}

export function ContactGrid(props: Props) {
  const { t } = useTranslation();
  const checkout = useRootStore('checkout');

  const { contact, label, className, count } = props;

  useEffect(() => {
    if (contact) {
      checkout.setCustomerContact(contact);
    }
  }, [contact, checkout]);

  function onAddOrChange() {
    // app.openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT');
  }

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="space-s-3 md:space-s-4 flex items-center">
          {count && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">{count}</span>}
          <p className="text-lg capitalize ml-2 text-heading lg:text-xl">{label}</p>
        </div>

        <Observer>
          {() => (
            <button
              className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover focus:text-accent-hover focus:outline-none"
              onClick={onAddOrChange}
            >
              <PlusIcon className="me-0.5 h-4 w-4 stroke-2" />
              {checkout.customerContact ? t('text-update') : t('text-add')}
            </button>
          )}
        </Observer>
      </div>

      <Observer>
        {() => (
          <div className="grid grid-cols-1 gap-4">
            <RenderComponent conditional={Boolean(checkout.customerContact)}>
              <ContactCard
                checked={Boolean(checkout.customerContact)}
                number={checkout.customerContact}
              />
            </RenderComponent>
            <RenderComponent conditional={!Boolean(checkout.customerContact)}>
              <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">{t('text-no-contact')}</span>
            </RenderComponent>
          </div>
        )}
      </Observer>
    </div>
  );
}
