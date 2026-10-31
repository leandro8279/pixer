import { useTranslation } from 'react-i18next';

import { RenderComponent } from '@/components/common/render-component';
import { PlusIcon } from '@/components/icons/plus-icon';

interface Props {
  count: number | boolean;
  label: string;
  onAdd: () => void;
}

export function AddressHeader(props: Props) {
  const { t } = useTranslation();
  const { onAdd, count, label } = props;

  return (
    <div className="mb-5 flex items-center justify-between md:mb-8">
      <div className="space-s-3 md:space-s-4 flex items-center">
        {count && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">{count}</span>}
        <p className="text-lg capitalize ml-2 text-heading lg:text-xl">{label}</p>
      </div>

      <RenderComponent conditional={onAdd}>
        <button
          className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover focus:text-accent-hover focus:outline-none"
          onClick={onAdd}
        >
          <PlusIcon className="me-0.5 h-4 w-4 stroke-2" />
          {t('text-add')}
        </button>
      </RenderComponent>
    </div>
  );
}
