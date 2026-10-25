import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from '@/components/ui/table';
import { usePrice } from '@/hooks/usePrice';
import { MappedPaginatorInfo, Order, SortOrder } from '@/types';
import { getAuthCredentials } from '@/utils/auth-utils';
import { formatAddress } from '@/utils/format-address';

import { RenderComponent } from '../common/render-component';
import { NoDataFound } from '../icons/no-data-found';
import { Badge } from '../ui/badge';
import { Pagination } from '../ui/pagination';
import { TitleWithSort } from '../ui/title-with-sort';
import StatusColor from './status-color';

interface Props {
  orders: Order[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

function RenderPrice({ amount, className }: { amount: number; className?: string }) {
  const { price } = usePrice({ amount: amount ?? 0 });
  return <span className={className}>{price}</span>;
}

export function OrderTransactionLists(props: Props) {
  const { t } = useTranslation();
  const { permissions } = getAuthCredentials();
  const rowExpandable = (record: any) => record.children?.length;
  const { orders, paginatorInfo, onPagination, onSort, onOrder } = props;
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: string | null }>({ sort: SortOrder.Desc, column: null });

  const onSubmit = async (shop_id: string | undefined) => {
    // setLoading(shop_id);
    // createConversations({
    //   // @ts-ignore
    //   shop_id,
    //   via: 'admin',
    // });
  };

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

  const columns: ColumnsType<Order> = [
    {
      title: t('table-item-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: 'center',
      width: 150,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-total')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'paid_total'}
          isActive={sortingObj?.column === 'paid_total'}
          className="cursor-pointer"
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'paid_total',
      key: 'paid_total',
      align: 'center',
      width: 120,
      onHeaderCell: () => onHeaderClick('paid_total'),
      render: (paid_total) => (
        <RenderPrice
          amount={paid_total}
          className="whitespace-nowrap"
        />
      ),
    },
    {
      title: t('table-item-product-price'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount) => <RenderPrice amount={amount} />,
    },
    {
      title: t('table-item-delivery-fee'),
      dataIndex: 'delivery_fee',
      key: 'delivery_fee',
      align: 'center',
      render: (amount) => <RenderPrice amount={amount} />,
    },
    {
      title: t('table-item-taxable-amount'),
      dataIndex: 'sales_tax',
      key: 'sales_tax',
      align: 'center',
      render: (amount) => <RenderPrice amount={amount} />,
    },
    {
      title: t('table-item-discount'),
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
      render: (amount) => <RenderPrice amount={amount} />,
    },
    {
      title: t('table-item-payment-gateway'),
      dataIndex: 'payment_gateway',
      key: 'payment_gateway',
      align: 'left',
      render: (payment_gateway: string) => <div>{payment_gateway}</div>,
    },
    {
      title: t('table-item-payment-status'),
      dataIndex: 'payment_status',
      key: 'payment_status',
      align: 'center',
      render: (payment_status: string) => (
        <Badge
          text={t(payment_status)}
          color={StatusColor(payment_status)}
        />
      ),
    },
  ];

  return (
    <>
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
          data={orders}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{ expandedRowRender: () => '', rowExpandable: rowExpandable }}
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
    </>
  );
}
