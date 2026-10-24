import type { MappedPaginatorInfo, Order, OrderStatus, Product } from '@/types';
import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@/components/common/action-buttons';
import { Avatar } from '@/components/common/avatar';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { Routes } from '@/config/routes';
import { usePrice } from '@/hooks/usePrice';

import StatusColor from './status-color';

import type { ColumnsType } from 'rc-table/lib/interface';
interface Props {
  title?: string;
  orders: Order[];
  className?: string;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  searchElement: React.ReactNode;
}

const PriceCell = ({ amount }: { amount: number }) => {
  const { price } = usePrice({ amount });

  return <span className="whitespace-nowrap font-medium">{price}</span>;
};

export function RecentOrders(props: Props) {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;

  const { orders, paginatorInfo, onPagination, searchElement, title, className } = props;

  const columns: ColumnsType<Order> | undefined = [
    {
      title: t('table-item-tracking-number'),
      dataIndex: 'tracking_number',
      key: 'tracking_number',
      align: 'left',
      width: 200,
    },
    {
      title: t('table-item-customer'),
      dataIndex: 'customer',
      key: 'name',
      align: 'left',
      width: 250,
      render: (customer: any) => (
        <div className="flex items-center">
          <Avatar name={customer?.name} />
          <div className="flex flex-col whitespace-nowrap font-medium ms-2">
            {customer?.name ? customer?.name : t('common:text-guest')}
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
      // title: t('table-item-order-date'),
      title: t('table-item-order-date'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return <span className="whitespace-nowrap">{dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}</span>;
      },
    },
    {
      title: t('table-item-total'),
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (value: number) => <PriceCell amount={value} />,
    },
    {
      title: t('table-item-status'),
      dataIndex: 'order_status',
      key: 'order_status',
      align: 'center',
      render: (order_status: OrderStatus) => (
        <Badge
          text={t(order_status)}
          color={StatusColor(order_status)}
          className="rounded! py-1.5 font-medium"
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
        return (
          <ActionButtons
            id={id}
            detailsUrl={`${Routes.order.list}/${id}`}
            customLocale={order.language}
          />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className={cn('overflow-hidden rounded-lg bg-white p-6 md:p-7', className)}>
        <div className="flex items-center justify-between pb-6 md:pb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {title}
          </h3>
          {searchElement}
        </div>
        <Table
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">{t('empty-table-data')}</div>
              <p className="text-[13px]">{t('empty-table-sorry-text')}</p>
            </div>
          )}
          rowKey="id"
          data={orders}
          scroll={{ x: 1000 }}
          expandable={{ expandedRowRender: () => '', rowExpandable: rowExpandable }}
        />
        <RenderComponent conditional={!!paginatorInfo?.total}>
          <div className="flex items-center justify-between py-2">
            <div className="mt-2 text-sm text-gray-500">
              {paginatorInfo?.currentPage} of {paginatorInfo?.lastPage} pages
            </div>
            <Pagination
              total={paginatorInfo?.total}
              current={paginatorInfo?.currentPage}
              pageSize={paginatorInfo?.perPage}
              onChange={onPagination}
            />
          </div>
        </RenderComponent>
      </div>
    </React.Fragment>
  );
}
