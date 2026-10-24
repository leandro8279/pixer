import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ColumnsType } from 'rc-table';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import { ActionButtons } from '@/components/common/action-buttons';
import { Avatar } from '@/components/common/avatar';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { usePrice } from '@/hooks/usePrice';
import { MappedPaginatorInfo, Order, Product, SortOrder } from '@/types';
import { getAuthCredentials } from '@/utils/auth-utils';
import { SUPER_ADMIN } from '@/utils/constants';

import StatusColor from './status-color';

interface Props {
  orders: Order[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

function RenderPrice({ amount }: { amount: number }) {
  const delivery_fee = amount ? amount : 0;
  const { price } = usePrice({
    amount: delivery_fee,
  });
  return <span>{price}</span>;
}

function RenderAmount({ amount }: { amount: number }) {
  const { price } = usePrice({
    amount: amount,
  });
  return <span className="whitespace-nowrap">{price}</span>;
}
export function OrderList(props: Props) {
  const { t } = useTranslation();
  const loading = false;
  const [location] = useLocation();
  const { permissions } = getAuthCredentials();
  const rowExpandable = (record: any) => record.children?.length;
  const { orders, paginatorInfo, onPagination, onSort, onOrder } = props;

  const [sortingObj, setSortingObj] = React.useState<{ sort: SortOrder; column: string | null }>({ sort: SortOrder.Desc, column: null });

  const onSubmit = async (shop_id: string | undefined) => {
    alert(shop_id);
    // setLoading(shop_id);
    // createConversations({
    //   shop_id: Number(shop_id),
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
      align: 'left',
      width: 200,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-customer')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
          isActive={sortingObj.column === 'name'}
        />
      ),
      dataIndex: 'customer',
      key: 'name',
      align: 'left',
      width: 250,
      onHeaderCell: () => onHeaderClick('name'),
      render: (customer: any) => (
        <div className="flex items-center">
          <Avatar name={customer?.name} />
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            {customer?.name ? customer?.name : t('text-guest')}
            <span className="text-[13px] font-normal text-gray-500/80">{customer?.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: t('table-item-products'),
      dataIndex: 'products',
      key: 'products',
      align: 'center',
      render: (products: Product) => <span>{products.length}</span>,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-order-date')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'created_at'}
          isActive={sortingObj?.column === 'created_at'}
          className="cursor-pointer"
        />
      ),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      onHeaderCell: () => onHeaderClick('created_at'),
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return <span className="whitespace-nowrap">{dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}</span>;
      },
    },
    {
      title: t('table-item-delivery-fee'),
      dataIndex: 'delivery_fee',
      key: 'delivery_fee',
      align: 'center',
      render: (amount) => <RenderPrice amount={amount} />,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-total')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'total'}
          isActive={sortingObj?.column === 'total'}
          className="cursor-pointer"
        />
      ),
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
      onHeaderCell: () => onHeaderClick('total'),
      render: (value) => <RenderAmount amount={value} />,
    },
    {
      title: t('table-item-status'),
      dataIndex: 'order_status',
      key: 'order_status',
      align: 'center',
      render: (order_status: string) => (
        <Badge
          text={t(order_status)}
          color={StatusColor(order_status)}
        />
      ),
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (id: string, order: Order) => {
        const currentButtonLoading = !!loading && loading === order?.shop_id;

        return (
          <>
            {/* @ts-ignore */}
            {order?.children?.length ?
              ''
            : <>
                {permissions?.includes(SUPER_ADMIN) && order?.shop_id ?
                  <button
                    onClick={() => onSubmit(order?.shop_id)}
                    disabled={currentButtonLoading}
                    className="cursor-pointer text-accent transition-colors duration-300 me-1.5 hover:text-accent-hover"
                  >
                    {/* <ChatIcon width="19" height="20" /> */}
                  </button>
                : ''}
              </>
            }
            <ActionButtons
              id={id}
              detailsUrl={`${location}/${id}`}
              customLocale={order.language}
            />
          </>
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
          data={orders}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
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
