import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { RenderComponent } from "@/components/common/render-component";
import { NoDataFound } from "@/components/icons/no-data-found";
import { Pagination } from "@/components/ui/pagination";
import { Table } from "@/components/ui/table";
import { usePrice } from "@/hooks/usePrice";
import { siteSettings } from "@/settings/site.settings";
import { ProductType } from "@/types";

import type { MappedPaginatorInfo, Product, Shop } from "@/types";
import type { ColumnsType } from "rc-table/lib/interface";

interface Props {
  title?: string;
  className?: string;
  products: Product[];
  searchElement?: React.ReactNode;
  paginatorInfo?: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
}

export function LowStockProduct(props: Props) {
  const { t } = useTranslation();
  const { products, title, searchElement, onPagination, paginatorInfo, className } = props;

  const columns: ColumnsType<Product> = [
    {
      title: t("table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "left",
      width: 140,
      render: (id: number) => `#${t("table-item-id")}: ${id}`,
    },
    {
      title: t("table-item-product"),
      dataIndex: "product",
      key: "product",
      align: "left",
      width: 280,
      render: (_: string, item: Product) => (
        <div className="flex items-center font-medium">
          <div className="relative aspect-square h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-200/80 bg-gray-100 me-2">
            <img alt={item.name} src={item.image?.thumbnail ?? siteSettings.product.placeholder} sizes="(max-width: 768px) 100vw" />
          </div>
          <span className="truncate">{item.name}</span>
        </div>
      ),
    },
    {
      title: t("table-item-sku"),
      dataIndex: "sku",
      key: "sku",
      align: "left",
      ellipsis: true,
      width: 170,
      render: (sku: string) => <span className="truncate whitespace-nowrap">{sku}</span>,
    },
    {
      title: t("table-item-group"),
      dataIndex: "type",
      key: "type",
      align: "left",
      width: 180,
      render: (type: any) => <span className="whitespace-nowrap">{type?.name}</span>,
    },
    {
      title: t("table-item-shop"),
      dataIndex: "shop",
      key: "shop",
      ellipsis: true,
      align: "left",
      width: 200,
      render: (shop: Shop) => (
        <div className="flex items-center">
          <div className="relative aspect-square h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-200/80 bg-gray-100 me-2">
            <img src={shop.logo?.thumbnail ?? siteSettings.product.placeholder} alt={shop?.name ?? "Shop Name"} sizes="(max-width: 768px) 100vw" />
          </div>
          <span className="truncate">{shop?.name}</span>
        </div>
      ),
    },
    {
      title: t("table-item-unit"),
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 120,
      render: function Render(value: number, record: Product) {
        const { price: max_price } = usePrice({ amount: record?.max_price as number });
        const { price: min_price } = usePrice({ amount: record?.min_price as number });

        const { price } = usePrice({ amount: value });

        const renderPrice = record?.product_type === ProductType.Variable ? `${min_price} - ${max_price}` : price;

        return (
          <span className="whitespace-nowrap font-medium" title={renderPrice}>
            {renderPrice}
          </span>
        );
      },
    },
    {
      title: t("table-item-stock-status"),
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (quantity: any) => {
        return (
          <React.Fragment>
            <RenderComponent conditional={quantity < 1}>
              <span className="truncate whitespace-nowrap rounded bg-status-failed/10 px-3 py-1.5 text-xs font-medium text-status-failed">
                {t("common:text-out-of-stock")}
              </span>
            </RenderComponent>
            <RenderComponent conditional={quantity != 1}>
              <span className="truncate whitespace-nowrap rounded bg-status-processing/10 px-3 py-1.5 text-xs font-medium text-status-processing">
                {t("common:text-low-in-stock")}
              </span>
            </RenderComponent>
          </React.Fragment>
        );
      },
    },
    {
      title: t("table-item-quantity"),
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 120,
    },
  ];

  return (
    <React.Fragment>
      <div className={classNames("overflow-hidden rounded-lg bg-white p-6 md:p-7", className)}>
        <div className="flex items-center justify-between pb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {t(title || "")}
          </h3>
          {searchElement}
        </div>
        <Table
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">{t("table:empty-table-data")}</div>
              <p className="text-[13px]">{t("table:empty-table-sorry-text")}</p>
            </div>
          )}
          data={products}
          rowKey="id"
          scroll={{ x: 200 }}
        />
        <RenderComponent conditional={!!paginatorInfo?.total}>
          <div className="flex items-center justify-between py-2">
            <div className="mt-2 text-gray-500">
              {paginatorInfo?.currentPage} of {paginatorInfo?.lastPage} pages
            </div>
            <Pagination total={paginatorInfo?.total} current={paginatorInfo?.currentPage} pageSize={paginatorInfo?.perPage} onChange={onPagination} />
          </div>
        </RenderComponent>
      </div>
    </React.Fragment>
  );
}
