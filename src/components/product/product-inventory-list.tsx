import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { useRouter } from '@/hooks/useRouter';
import { siteSettings } from '@/settings/site.settings';
import { MappedPaginatorInfo, Product, SortOrder } from '@/types';

interface Props {
  products: Product[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

export function ProductInventoryList(props: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const { products, paginatorInfo, onPagination, onSort, onOrder } = props;
  const [sortingObj, setSortingObj] = useState<SortingObjType>({ sort: SortOrder.Desc, column: null });

  const shop = router.searchParams.get('shop');

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

  let columns: ColumnsType<Product> = [
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
          title={t('table-item-title')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 280,
      ellipsis: true,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: string, { image, type }) => (
        <div className="flex items-center">
          <div className="relative aspect-square h-10 w-10 shrink-0 overflow-hidden rounded border border-border-200/80 bg-gray-100 me-2.5">
            <img
              src={image?.thumbnail ?? siteSettings.product.placeholder}
              alt={name}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
          <div className="flex flex-col">
            <span className="truncate font-medium">{name}</span>
            <span className="truncate whitespace-nowrap pt-1 pb-0.5 text-[13px] text-body/80">{type?.name}</span>
          </div>
        </div>
      ),
    },
    {
      title: t('table-item-sku'),
      dataIndex: 'sku',
      key: 'sku',
      width: 200,
      align: 'left',
      ellipsis: true,
      render: (sku: any) => <span className="truncate whitespace-nowrap">{sku}</span>,
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-quantity')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'quantity'}
          isActive={sortingObj.column === 'quantity'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 150,
      onHeaderCell: () => onHeaderClick('quantity'),
      render: (quantity: number) => {
        if (quantity < 10) {
          return (
            <React.Fragment>
              <div
                className={`flex justify-start ${
                  quantity > 0 && quantity < 10 ?
                    'flex-col items-baseline space-y-3 3xl:flex-row 3xl:space-x-2 3xl:space-y-0 rtl:3xl:space-x-reverse'
                  : 'items-center space-x-2 rtl:space-x-reverse'
                }`}
              >
                <RenderComponent conditional={quantity < 1}>
                  <Badge
                    text={t('common:text-out-of-stock')}
                    color="bg-status-failed/10 text-status-failed"
                    className="capitalize"
                  />
                </RenderComponent>

                <RenderComponent conditional={!Boolean(quantity < 1)}>
                  <Badge
                    text={t('common:text-low-quantity')}
                    color="bg-status-failed/10 text-status-failed"
                    animate={true}
                    className="capitalize"
                  />
                </RenderComponent>
                <span>{quantity}</span>
              </div>
            </React.Fragment>
          );
        }
        return <span>{quantity}</span>;
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-sold-quantity')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'sold_quantity'}
          isActive={sortingObj.column === 'sold_quantity'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'sold_quantity',
      key: 'sold_quantity',
      width: 120,
      align: 'center',
      onHeaderCell: () => onHeaderClick('sold_quantity'),
      render: (sold_quantity: number) => <span className="truncate whitespace-nowrap">{sold_quantity}</span>,
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (slug: string, record: Product) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_PRODUCT"
          routes={Routes.inventory}
          isShop={Boolean(shop)}
          shopSlug={(shop as string) ?? ''}
        />
      ),
    },
  ];

  if (shop) {
    columns = columns?.filter((column) => column?.key !== 'shop');
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
          data={products}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      <RenderComponent conditional={!!paginatorInfo?.total}>
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      </RenderComponent>
    </React.Fragment>
  );
}
