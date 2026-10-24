import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionMeta } from 'react-select';

import { Select } from '@/components/ui/select';
import { useRootStore } from '@/contexts/root';

interface Props {
  className?: string;
  onTypeFilter: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
}

export const TypeFilter = observer((props: Props) => {
  const { onTypeFilter, className } = props;
  const { t } = useTranslation();
  const type = useRootStore('type');

  useEffect(() => {
    type.setParams({ language: 'en' });
  }, []);

  return (
    <div className={classNames('flex w-full', className)}>
      <div className="w-full">
        <Select
          options={type.types}
          isLoading={type.typesQuery.isLoading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('filter-by-group-placeholder')}
          onChange={onTypeFilter}
          isClearable={true}
        />
      </div>
    </div>
  );
});
