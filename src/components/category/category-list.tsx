import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import * as categoriesIcon from '@/components/icons/category';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { siteSettings } from '@/settings/site.settings';
import { Category, MappedPaginatorInfo, SortOrder } from '@/types';
import { getIcon } from '@/utils/get-icon';

interface Props {
  categories: Category[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
}

export function CategoryList(props: Props) {
  const { categories, paginatorInfo, onPagination, onSort, onOrder } = props;
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
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

  const columns: ColumnsType<Category> = [
    {
      title: t('table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'left',
      width: 120,
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
      width: 180,
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: string, { image }) => {
        return (
          <div className="flex items-center">
            <div className="relative aspect-square h-10 w-10 shrink-0 overflow-hidden rounded border border-border-200/80 bg-gray-100 me-2.5">
              <img
                src={image?.thumbnail ?? siteSettings.product.placeholder}
                alt={name}
                sizes="(max-width: 768px) 100vw"
              />
            </div>
            <span className="truncate font-medium">{name}</span>
          </div>
        );
      },
    },
    {
      title: t('table-item-details'),
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
      align: 'left',
      width: 200,
    },
    {
      title: t('table-item-icon'),
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      width: 120,
      render: (icon: string) => {
        if (!icon) return null;
        return (
          <span className="flex items-center justify-center">
            {getIcon({ iconList: categoriesIcon, iconName: icon, className: 'w-5 h-5 max-h-full max-w-full' })}
          </span>
        );
      },
    },
    {
      title: (
        <TitleWithSort
          title={t('table-item-slug')}
          ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'slug'}
          isActive={sortingObj.column === 'slug'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'slug',
      key: 'slug',
      align: 'left',
      width: 150,
      onHeaderCell: () => onHeaderClick('slug'),
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (slug: string, record: Category) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_CATEGORY"
          routes={Routes.category}
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
          data={categories}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{ expandedRowRender: () => ' ', rowExpandable: rowExpandable }}
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
