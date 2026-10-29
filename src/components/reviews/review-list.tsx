import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';

import { ActionButtons } from '@/components/common/action-buttons';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { StarIcon } from '@/components/icons/star-icon';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { useRouter } from '@/hooks/useRouter';
import { siteSettings } from '@/settings/site.settings';
import { MappedPaginatorInfo, Product, Review, SortOrder } from '@/types';

import { ReviewCard } from './review-card';

interface Props {
  customers: Review[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: any) => void;
}

export function ReviewList(props: Props) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const { searchParams } = useRouter();
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: any | null }>({ sort: SortOrder.Desc, column: null });
  const { customers, paginatorInfo, onPagination, onSort, onOrder } = props;

  const shop = searchParams.get('shop');
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

  function openAbuseReportModal(id: string) {
    alert(id);
    // openModal('ABUSE_REPORT', {
    //   model_id: id,
    //   model_type: 'Review',
    // });
  }

  const columns: ColumnsType<Review> = [
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
      width: 120,
      onHeaderCell: () => onHeaderClick('id'),
      render: (id: number) => `#${t('table-item-id')}: ${id}`,
    },
    {
      title: t('table-item-product'),
      dataIndex: 'product',
      key: 'product-image',
      align: 'left',
      width: 220,
      render: (product: Product) => (
        <div className="flex items-center">
          <div className="relative aspect-square h-14 w-14 shrink-0 overflow-hidden rounded border border-border-200/80 bg-gray-100 me-2.5">
            <img
              src={product?.image?.thumbnail ?? siteSettings.product.placeholder}
              alt={product?.name}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
          <Link href={`${import.meta.env.PUBLIC_SHOP_URL}/products/${product?.slug}`}>
            <span className="truncate whitespace-nowrap font-medium">{product?.name}</span>
          </Link>
        </div>
      ),
    },
    {
      title: t('table-item-customer-review'),
      key: 'review',
      align: 'left',
      width: 350,
      render: (record) => <ReviewCard review={record} />,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-ratings')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'rating'}
          isActive={sortingObj.column === 'rating'}
        />
      ),
      key: 'rating',
      className: 'cursor-pointer',
      align: 'center',
      width: 150,
      onHeaderCell: () => onHeaderClick('rating'),
      render: (record: any) => (
        <div className="inline-flex shrink-0 items-center rounded-full border border-accent px-3 py-0.5 text-base text-accent">
          {record?.rating}
          <StarIcon className="h-3 w-3 ms-1" />
        </div>
      ),
    },
    {
      title: t('table-item-reports'),
      key: 'report',
      align: 'center',
      width: 150,
      render: (record) => {
        if (shop) {
          return <span className="font-bold">{record?.abusive_reports_count}</span>;
        }
        return (
          <React.Fragment>
            <span className="font-bold">{record?.abusive_reports_count}</span>
            <RenderComponent conditional={record?.abusive_reports_count > 0}>
              <a
                href={`${location}/${record?.id}`}
                className="text-sm transition-colors ms-2 hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                ({t('text-details')})
              </a>
            </RenderComponent>
          </React.Fragment>
        );
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-date')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'created_at'}
          isActive={sortingObj.column === 'created_at'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'left',
      width: 120,
      onHeaderCell: () => onHeaderClick('created_at'),
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return <span className="whitespace-nowrap">{dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}</span>;
      },
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 100,
      render: (id: string) => {
        if (shop) {
          return <button onClick={() => openAbuseReportModal(id)}>{t('text-report')}</button>;
        }
        return (
          <ActionButtons
            id={id}
            deleteModalView="DELETE_REVIEW"
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
