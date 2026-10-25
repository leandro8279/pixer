import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@/components/common/action-buttons';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { MappedPaginatorInfo, SortOrder, User } from '@/types';

interface Props {
  customers: User[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: any) => void;
}

export function StaffList(props: Props) {
  const { t } = useTranslation();
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: any | null }>({ sort: SortOrder.Desc, column: null });
  const { customers, paginatorInfo, onPagination, onSort, onOrder } = props;

  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort(sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);

      onOrder(column);

      setSortingObj({
        sort: sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns: ColumnsType<User> = [
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
      align: 'left',
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: 'left',
    },
    {
      title: t('table-item-status'),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (is_active: boolean) => (
        <Badge
          textKey={is_active ? t('text-active') : t('text-inactive')}
          color={is_active ? 'bg-accent/10 !text-accent' : 'bg-status-failed/10 text-status-failed'}
        />
      ),
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            deleteModalView="DELETE_STAFF"
          />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">{t('empty-table-data')}</div>
              <p className="text-[13px]">{t('empty-table-sorry-text')}</p>
            </div>
          )}
          data={customers as any}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      <RenderComponent conditional={!!paginatorInfo?.total}>
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      </RenderComponent>
    </React.Fragment>
  );
}
