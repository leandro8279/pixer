import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButtons } from '@/components/common/action-buttons';
import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { useRouter } from '@/hooks/useRouter';
import { MappedPaginatorInfo, SortOrder, TermsAndConditions, User } from '@/types';
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  termsAndConditions: TermsAndConditions[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  user?: User | undefined;
}

export function TermsAndConditionsList(props: Props) {
  const { t } = useTranslation();
  const { searchParams } = useRouter();
  const shop = searchParams.get('shop');
  const { termsAndConditions, paginatorInfo, onPagination, onSort, onOrder } = props;

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

  const { permissions } = getAuthCredentials();
  let permission = hasAccess(adminOnly, permissions);

  const columns: ColumnsType<TermsAndConditions> = [
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
          title={t('table-item-title')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'title'}
          isActive={sortingObj?.column === 'title'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'title',
      key: 'title',
      align: 'left',
      ellipsis: true,
      width: 200,
      onHeaderCell: () => onHeaderClick('title'),
      render: (text: string) => <span className="whitespace-nowrap">{text}</span>,
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-description')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'description'}
          isActive={sortingObj?.column === 'description'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('description'),
      render: (text: string) => (
        <span
          dangerouslySetInnerHTML={{
            __html: text?.length < 100 ? text : text?.substring(0, 100) + '@/components.',
          }}
        />
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-type')}
          ascending={sortingObj?.sort === SortOrder?.Asc && sortingObj?.column === 'type'}
          isActive={sortingObj?.column === 'type'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      onHeaderCell: () => onHeaderClick('type'),
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
      onHeaderCell: () => onHeaderClick('issued_by'),
      render: (text: string) => <span className="whitespace-nowrap">{text}</span>,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-status')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'is_approved'}
          isActive={sortingObj.column === 'is_approved'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'is_approved',
      key: 'is_approved',
      align: 'center',
      onHeaderCell: () => onHeaderClick('is_approved'),
      render: (is_approved: boolean) => (
        <Badge
          textKey={is_approved ? 'Approved' : 'Waiting for approval'}
          color={is_approved ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-500'}
        />
      ),
    },
    {
      title: t('text-approval-action'),
      dataIndex: 'id',
      key: 'actions',
      align: 'center',
      render: (id: string, { slug, is_approved }: any) => {
        return (
          <ActionButtons
            id={id}
            termApproveButton={permission}
            detailsUrl={shop ? `/${shop}/terms-and-conditions/${slug}` : `/terms-and-conditions/${slug}`}
            isTermsApproved={is_approved}
          />
        );
      },
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      render: (slug: string, record: TermsAndConditions) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_TERMS_AND_CONDITIONS"
          routes={Routes?.termsAndCondition}
          isShop={Boolean(shop)}
          shopSlug={(shop as string) ?? ''}
        />
      ),
    },
    // {
    //   title: t('table-item-actions'),
    //   key: 'actions',
    //   align: alignRight,
    //   width: 150,
    //   render: (data: TermsAndConditions) => {
    //     if (router?.asPath !== '/') {
    //       return (
    //         <>
    //           <LanguageSwitcher
    //             slug={data?.id}
    //             record={data}
    //             deleteModalView="DELETE_TERMS_AND_CONDITIONS"
    //             routes={Routes?.termsAndCondition}
    //           />
    //         </>
    //       );
    //     } else {
    //       return (
    //         <ActionButtons
    //           id={data?.id}
    //           detailsUrl={Routes?.termsAndCondition?.details(data?.id)}
    //           customLocale={router?.locale}
    //         />
    //       );
    //     }
    //   },
    // },
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
          data={termsAndConditions}
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
