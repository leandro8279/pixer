import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

import { ActionButtons } from '@/components/common/action-buttons';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { useRouter } from '@/hooks/useRouter';
import { FAQs, MappedPaginatorInfo, SortOrder } from '@/types';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  faqs: FAQs[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: any) => void;
}

export function FaqsList(props: Props) {
  const { t } = useTranslation();
  const { searchParams } = useRouter();
  const [location] = useLocation();
  const { faqs, paginatorInfo, onPagination, onSort, onOrder } = props;
  const [sortingObj, setSortingObj] = useState<{ sort: SortOrder; column: string | null }>({ sort: SortOrder?.Desc, column: null });

  const shop = searchParams.get('shop');

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort(sortingObj?.sort === SortOrder?.Desc ? SortOrder?.Asc : SortOrder?.Desc);
      onOrder(column!);

      setSortingObj({
        sort: sortingObj?.sort === SortOrder?.Desc ? SortOrder?.Asc : SortOrder?.Desc,
        column: column,
      });
    },
  });

  const columns: ColumnsType<FAQs> = [
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
      title: (
        <TitleWithSort
          title={t('table-item-title-title')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'faq_title'}
          isActive={sortingObj?.column === 'faq_title'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'faq_title',
      key: 'faq_title',
      align: 'left',
      ellipsis: true,
      width: 200,
      onHeaderCell: () => onHeaderClick('faq_title'),
      render: (text: string) => <span className="whitespace-nowrap">{text}</span>,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-description')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'faq_description'}
          isActive={sortingObj?.column === 'faq_description'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'faq_description',
      key: 'faq_description',
      align: 'left',
      width: 300,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('faq_description'),
      render: (text: string) => (
        <span
          dangerouslySetInnerHTML={{
            __html: text?.length < 140 ? text : text?.substring(0, 140) + '...',
          }}
        />
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-type')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'faq_type'}
          isActive={sortingObj?.column === 'faq_type'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'faq_type',
      key: 'faq_type',
      align: 'center',
      width: 100,
      onHeaderCell: () => onHeaderClick('faq_type'),
      render: (text: string) => <span className="whitespace-nowrap">{text}</span>,
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-issued-by')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'issued_by'}
          isActive={sortingObj?.column === 'issued_by'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'issued_by',
      key: 'issued_by',
      align: 'center',
      width: 100,
      onHeaderCell: () => onHeaderClick('issued_by'),
      render: (text: string) => <span className="whitespace-nowrap">{text}</span>,
    },

    {
      title: t('table-item-actions'),
      key: 'actions',
      align: 'right',
      width: 150,
      render: (data: FAQs) => {
        if (location !== '/') {
          return (
            <LanguageSwitcher
              slug={data?.id}
              record={data}
              deleteModalView="DELETE_FAQ"
              routes={Routes?.faqs}
              isShop={Boolean(shop)}
              shopSlug={(shop as string) ?? ''}
            />
          );
        } else {
          return (
            <ActionButtons
              id={data?.id}
              detailsUrl={`${location}/${data?.id}`}
              customLocale={'en'}
            />
          );
        }
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
          data={faqs}
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
