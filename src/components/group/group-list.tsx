import { ColumnsType } from 'rc-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/language-switcher';
import { NoDataFound } from '@/components/icons/no-data-found';
import * as typeIcons from '@/components/icons/type';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { SortOrder, Type } from '@/types';
import { getIcon } from '@/utils/get-icon';

interface Props {
  types: Type[];
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

export function GroupList(props: Props) {
  const { t } = useTranslation();
  const { types, onSort, onOrder } = props;
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: string | null }>({ sort: SortOrder.Desc, column: null });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort(sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
      onOrder(column!);

      setSortingObj({
        sort: sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns: ColumnsType<Type> = [
    {
      title: (
        <TitleWithSort
          title={t('table-item-id')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'id'}
          isActive={sortingObj.column === 'id'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'id',
      align: 'left',
      width: 150,
      onHeaderCell: () => onHeaderClick('id'),
      render: (id: number) => `#${t('table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-homepage-name')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
          isActive={sortingObj.column === 'name'}
        />
      ),
      width: 220,
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t('table-item-slug'),
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
      width: 220,
      ellipsis: true,
    },
    {
      title: t('table-item-icon'),
      dataIndex: 'icon',
      key: 'slug',
      align: 'center',
      width: 150,
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({ iconList: typeIcons, iconName: icon, className: 'w-5 h-5 max-h-full max-w-full' })}
          </span>
        );
      },
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (slug: string, record: Type) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_TYPE"
          routes={Routes.type}
        />
      ),
    },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded shadow">
      <Table
        columns={columns}
        emptyText={() => (
          <div className="flex flex-col items-center py-7">
            <NoDataFound className="w-52" />
            <div className="mb-1 pt-6 text-base font-semibold text-heading">{t('empty-table-data')}</div>
            <p className="text-[13px]">{t('empty-table-sorry-text')}</p>
          </div>
        )}
        data={types}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
}
