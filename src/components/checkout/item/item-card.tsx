import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { usePrice } from '@/hooks/usePrice';

interface Props {
  item: any;
  notAvailable?: boolean;
}

export function ItemCard({ item, notAvailable }: Props) {
  const { t } = useTranslation();

  const { price } = usePrice({ amount: item.itemTotal });

  return (
    <div
      className={classNames('flex justify-between py-2')}
      key={item.id}
    >
      <p className="flex items-center justify-between text-base">
        <span className={classNames('text-sm', notAvailable ? 'text-red-500' : 'text-body')}>
          <span className={classNames('text-sm font-bold', notAvailable ? 'text-red-500' : 'text-heading')}>{item.quantity}</span>
          <span className="mx-2">x</span>
          <span>{item.name}</span> | <span>{item.unit}</span>
        </span>
      </p>
      <span className={classNames('text-sm', notAvailable ? 'text-red-500' : 'text-body')}>{!notAvailable ? price : t('text-unavailable')}</span>
    </div>
  );
}
