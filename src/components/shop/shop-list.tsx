import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

import { ActionButtons } from '@/components/common/action-buttons';
import { Avatar } from '@/components/common/avatar';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { siteSettings } from '@/settings/site.settings';
import { SortOrder } from '@/types';
import { getAuthCredentials } from '@/utils/auth-utils';
import { OWNERSHIP_TRANSFER_STATUS, SUPER_ADMIN } from '@/utils/constants';

import type { MappedPaginatorInfo, OwnerShipTransferStatus, Shop } from '@/types';

import type { ColumnsType } from 'rc-table/lib/interface';

interface Props {
  shops: Shop[];
  onSort: (current: any) => void;
  isMultiCommissionRate?: boolean;
  onOrder: (current: string) => void;
  onPagination: (current: number) => void;
  paginatorInfo: MappedPaginatorInfo | null;
}

export function ShopList(props: Props) {
  const { t } = useTranslation();
  const { permissions } = getAuthCredentials();
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: string | null }>({ sort: SortOrder.Desc, column: null });
  const { shops, paginatorInfo, onPagination, onSort, onOrder, isMultiCommissionRate } = props;

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort(sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
      onOrder(column!);

      setSortingObj({ sort: sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc, column: column });
    },
  });

  let columns: ColumnsType<Shop> = [
    {
      title: t('table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'left',
      width: 130,
      render: (id: number) => `#${t('table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-shop')}
          isActive={sortingObj.column === 'name'}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 250,
      className: 'cursor-pointer',
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any, { slug, logo }: any) => (
        <div className="flex items-center">
          <div className="relative aspect-square h-10 w-10 shrink-0 overflow-hidden rounded border border-border-200/80 bg-gray-100 me-2.5">
            <img
              src={logo?.thumbnail ?? siteSettings?.product?.placeholder}
              alt={name}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
          <Link href={`/${slug}`}>
            <span className="truncate whitespace-nowrap font-medium">{name}</span>
          </Link>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-total-products')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'products_count'}
          isActive={sortingObj.column === 'products_count'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'products_count',
      key: 'products_count',
      align: 'center',
      width: 180,
      onHeaderCell: () => onHeaderClick('products_count'),
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-total-orders')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'orders_count'}
          isActive={sortingObj.column === 'orders_count'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'orders_count',
      key: 'orders_count',
      align: 'center',
      onHeaderCell: () => onHeaderClick('orders_count'),
      width: 180,
    },
    {
      title: t('table-item-owner-name'),
      dataIndex: 'owner',
      key: 'owner',
      align: 'left',
      width: 250,
      render: (owner: any) => (
        <div className="flex items-center">
          <Avatar
            name={owner?.name}
            src={owner?.profile?.avatar?.thumbnail}
          />
          <span className="whitespace-nowrap font-medium ms-2">{owner?.name}</span>
        </div>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-status')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'is_active'}
          isActive={sortingObj.column === 'is_active'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      width: 150,
      onHeaderCell: () => onHeaderClick('is_active'),
      render: (is_active: boolean) => (
        <Badge
          textKey={is_active ? 'common:text-active' : 'common:text-inactive'}
          color={is_active ? 'bg-accent/10 !text-accent' : 'bg-status-failed/10 text-status-failed'}
        />
      ),
    },
    {
      title: t('text-quote-title'),
      key: 'settings',
      align: 'center',
      width: 80,
      render: (_: string, { settings, is_active }: Shop) => {
        return (
          <RenderComponent conditional={Boolean(settings?.askForAQuote?.enable) && !Boolean(is_active) && Boolean(isMultiCommissionRate)}>
            <Badge
              textKey={settings?.askForAQuote?.quote}
              color="bg-accent/10 text-accent"
            />
          </RenderComponent>
        );
      },
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (id: string, { slug, is_active, owner_id, ownership_history, settings }: Shop) => {
        return (
          <ActionButtons
            id={id}
            approveButton={true}
            detailsUrl={`/${slug}`}
            isShopActive={is_active}
            transferShopOwnership
            disabled={!Boolean(is_active) || OWNERSHIP_TRANSFER_STATUS?.includes(ownership_history?.status as OwnerShipTransferStatus)}
            data={{
              ...settings?.askForAQuote,
              multiCommission: Boolean(isMultiCommissionRate),
              id,
              owner_id: owner_id as number,
            }}
          />
        );
      },
    },
  ];

  if (!Boolean(isMultiCommissionRate)) {
    columns = columns?.filter((column) => column?.key !== 'settings');
  }

  if (!permissions?.includes(SUPER_ADMIN)) {
    columns = columns?.filter((column) => column?.key !== 'actions');
  }

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
          data={shops}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      <RenderComponent conditional={!!paginatorInfo?.total}>
        <div className="flex items-center justify-end">
          <Pagination
            onChange={onPagination}
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
          />
        </div>
      </RenderComponent>
    </React.Fragment>
  );
}
