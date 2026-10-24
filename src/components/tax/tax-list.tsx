import { ColumnsType } from 'rc-table';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@/components/common/action-buttons';
import { NoDataFound } from '@/components/icons/no-data-found';
import { AlignType, Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { SortOrder, Tax } from '@/types';

interface Props {
  taxes: Tax[];
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

export function TaxList(props: Props) {
  const { t } = useTranslation();
  const { onOrder, onSort, taxes } = props;

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

  const columns: ColumnsType<Tax> = [
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
      width: 130,
      onHeaderCell: () => onHeaderClick('id'),
      render: (id: number) => `#${t('table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-title')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: 'left' as AlignType,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: (
        <TitleWithSort
          title={`${t('table-item-rate')} (%)`}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'rate'}
          isActive={sortingObj.column === 'rate'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center' as AlignType,
      onHeaderCell: () => onHeaderClick('rate'),
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-country')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'country'}
          isActive={sortingObj.column === 'country'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'country',
      key: 'country',
      align: 'center' as AlignType,
      onHeaderCell: () => onHeaderClick('country'),
    },
    {
      title: t('table-item-city'),
      dataIndex: 'city',
      key: 'city',
      align: 'center' as AlignType,
    },
    {
      title: t('table-item-state'),
      dataIndex: 'state',
      key: 'state',
      align: 'center' as AlignType,
    },
    {
      title: t('table-item-zip'),
      dataIndex: 'zip',
      key: 'zip',
      align: 'center' as AlignType,
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right' as AlignType,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${Routes.tax.list}/edit/${id}`}
          deleteModalView="DELETE_TAX"
        />
      ),
      width: 200,
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
        data={taxes}
        rowKey="id"
        scroll={{ x: 900 }}
      />
    </div>
  );
}
