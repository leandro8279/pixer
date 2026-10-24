import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'wouter';

import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { usePrice } from '@/hooks/usePrice';
import { siteSettings } from '@/settings/site.settings';
import { MappedPaginatorInfo, Product, ProductType, Shop, SortOrder } from '@/types';

interface Props {
  products: Product[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  sort?: SortOrder;
  onOrder: (current: string) => void;
}

type SortingObjType = {
  sort: SortOrder;
  column: string | null;
};

const PriceCell = ({ value, record }: { value: number; record: Product }) => {
  const { price: max_price } = usePrice({ amount: record?.max_price as number });
  const { price: min_price } = usePrice({ amount: record?.min_price as number });
  const { price } = usePrice({ amount: value });

  const renderPrice = record?.product_type === ProductType.Variable ? `${min_price} - ${max_price}` : price;

  return (
    <span
      className="whitespace-nowrap"
      title={renderPrice}
    >
      {renderPrice}
    </span>
  );
};

export function ProductList(props: Props) {
  const { t } = useTranslation();
  const { sort, products, paginatorInfo, onPagination, onSort, onOrder } = props;
  const [sortingObj, setSortingObj] = useState<SortingObjType>({ sort: SortOrder.Desc, column: null });
  const [searchParams] = useSearchParams();

  const shop = searchParams.get('shop');

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort(sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
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
          title={t('table-item-product')}
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
      title: t('table-item-product-type'),
      dataIndex: 'product_type',
      key: 'product_type',
      width: 150,
      align: 'left',
      render: (product_type: string) => <span className="truncate whitespace-nowrap capitalize">{product_type}</span>,
    },
    {
      title: t('table-item-shop'),
      dataIndex: 'shop',
      key: 'shop',
      width: 170,
      align: 'left',
      ellipsis: true,
      render: (shop: Shop) => (
        <div className="flex items-center font-medium">
          <div className="relative aspect-square h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-200/80 bg-gray-100 me-2">
            <img
              src={shop?.logo?.thumbnail ?? siteSettings.product.placeholder}
              alt={shop?.name ?? 'Shop Name'}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
          <span className="truncate">{shop?.name}</span>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table-item-unit')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'price'}
          isActive={sortingObj.column === 'price'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      width: 180,
      onHeaderCell: () => onHeaderClick('price'),
      render: (value: number, record: Product) => (
        <PriceCell
          value={value}
          record={record}
        />
      ),
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
      width: 170,
      onHeaderCell: () => onHeaderClick('quantity'),
      render: (quantity: number) => {
        if (quantity < 1) {
          return (
            <Badge
              text={t('text-out-of-stock')}
              color="bg-status-failed/10 text-status-failed"
              className="capitalize"
            />
          );
        }
        return <span>{quantity}</span>;
      },
    },
    {
      title: t('table-item-status'),
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 200,
      render: (status: string, record: any) => (
        <div
          className={`flex justify-start ${
            record?.quantity > 0 && record?.quantity < 10 ?
              'flex-col items-baseline space-y-2 3xl:flex-row 3xl:space-x-2 3xl:space-y-0 rtl:3xl:space-x-reverse'
            : 'items-center space-x-2 rtl:space-x-reverse'
          }`}
        >
          <Badge
            text={status}
            color={status.toLocaleLowerCase() === 'draft' ? 'bg-yellow-400/10 text-yellow-500' : 'bg-accent bg-opacity-10 !text-accent'}
            className="capitalize"
          />
          <RenderComponent conditional={record?.quantity > 0 && record?.quantity < 10}>
            <Badge
              text={t('text-low-quantity')}
              color="bg-status-failed/10 text-status-failed"
              animate={true}
              className="capitalize"
            />
          </RenderComponent>
        </div>
      ),
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
          routes={Routes.product}
          enablePreviewMode={true}
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
