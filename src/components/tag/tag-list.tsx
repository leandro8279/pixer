import { ColumnsType } from 'rc-table';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from '@/components/common/language-switcher';
import { RenderComponent } from '@/components/common/render-component';
import { NoDataFound } from '@/components/icons/no-data-found';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { TitleWithSort } from '@/components/ui/title-with-sort';
import { Routes } from '@/config/routes';
import { MappedPaginatorInfo, SortOrder, Tag } from '@/types';

interface Props {
  tags: Tag[];
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  paginatorInfo: MappedPaginatorInfo | null;
}

export function TagList(props: Props) {
  const { t } = useTranslation();
  const { tags, onPagination, onSort, onOrder, paginatorInfo } = props;
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

  const columns: ColumnsType<Tag> = [
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
      width: 180,
      onHeaderCell: () => onHeaderClick('id'),
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
      width: 220,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('table-item-slug'),
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
      width: 250,
      ellipsis: true,
    },
    {
      title: t('table-item-group'),
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      width: 250,
      render: (type: any) => (
        <div
          className="overflow-hidden truncate whitespace-nowrap"
          title={type?.name}
        >
          {type?.name}
        </div>
      ),
    },
    {
      title: t('table-item-actions'),
      dataIndex: 'slug',
      key: 'actions',
      align: 'right',
      width: 120,
      render: (slug: string, record: Tag) => (
        <LanguageSwitcher
          slug={slug}
          record={record}
          deleteModalView="DELETE_TAG"
          routes={Routes.tag}
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
          data={tags}
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
