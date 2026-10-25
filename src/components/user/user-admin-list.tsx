import { observer } from 'mobx-react-lite';
import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@/components/common/action-buttons';
import { Avatar } from '@/components/common/avatar';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { useRootStore } from '@/contexts/root';
import { MappedPaginatorInfo, SortOrder, User } from '@/types';

interface Props {
  customers: User[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: any) => void;
}

const RenderUser = observer(({ isActive, userId }: { isActive: boolean; userId: string }) => {
  const auth = useRootStore('auth');

  return (
    <RenderComponent conditional={auth.me.id != userId}>
      <ActionButtons
        id={userId}
        userStatus={true}
        isUserActive={isActive}
        showAddWalletPoints={true}
        showMakeAdminButton={true}
      />
    </RenderComponent>
  );
});

export function UserAdminList(props: Props) {
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
          title={t('table:table-item-id')}
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
      render: (id: number) => `#${t('table:table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'id'}
          isActive={sortingObj.column === 'id'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 250,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: string, { profile, email }) => (
        <div className="flex items-center">
          <Avatar
            name={name}
            src={profile?.avatar?.thumbnail}
          />
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            {name}
            <span className="text-[13px] font-normal text-gray-500/80">{email}</span>
          </div>
        </div>
      ),
    },
    {
      title: t('table:table-item-permissions'),
      dataIndex: 'permissions',
      key: 'permissions',
      align: 'left',
      width: 300,
      render: (permissions: any) => {
        return (
          <div className="flex flex-wrap gap-1.5 whitespace-nowrap">
            {permissions?.map(({ name, index }: { name: string; index: number }) => (
              <span
                key={index}
                className="rounded bg-gray-200/50 px-2.5 py-1"
              >
                {name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: t('table:table-item-available_wallet_points'),
      dataIndex: ['wallet', 'available_points'],
      key: 'available_wallet_points',
      align: 'center',
      width: 150,
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-status')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'is_active'}
          isActive={sortingObj.column === 'is_active'}
        />
      ),
      width: 150,
      className: 'cursor-pointer',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      onHeaderCell: () => onHeaderClick('is_active'),
      render: (is_active: boolean) => (
        <Badge
          textKey={is_active ? 'common:text-active' : 'common:text-inactive'}
          color={is_active ? 'bg-accent/10 !text-accent' : 'bg-status-failed/10 text-status-failed'}
        />
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (id: string, { is_active }) => (
        <RenderUser
          userId={id}
          isActive={is_active}
        />
      ),
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
