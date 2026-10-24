import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { NoDataFound } from "@/components/icons/no-data-found";
import { Table } from "@/components/ui/table";

import type { Product } from "@/types";
import type { ColumnsType } from "rc-table/lib/interface";
interface Props {
  title: string;
  className?: string;
  products: Product[];
}

export function ProductCountByCategory(props: Props) {
  const { t } = useTranslation();
  const { products, title, className } = props;

  let columns: ColumnsType<Product> = [
    {
      title: t("table-item-category-id"),
      dataIndex: "category_id",
      key: "category_id",
      align: "left",
      width: 120,
      render: (id: number) => `#${t("table-item-id")}: ${id}`,
    },
    {
      title: t("table-item-category-name"),
      className: "cursor-pointer",
      dataIndex: "category_name",
      key: "category_name",
      align: "left",
      width: 220,
      ellipsis: true,
    },
    {
      title: t("table-item-shop"),
      dataIndex: "shop_name",
      key: "shop",
      align: "left",
      ellipsis: true,
      width: 200,
      render: (shop_name: string) => <span className="truncate whitespace-nowrap">{shop_name}</span>,
    },
    {
      title: t("table-item-Product-count"),
      className: "cursor-pointer",
      dataIndex: "product_count",
      key: "product_count",
      width: 180,
      align: "center",
      render: (product_count: number) => {
        return <span>{product_count}</span>;
      },
    },
  ];
  return (
    <React.Fragment>
      <div className={classNames("overflow-hidden rounded-lg bg-white p-7", className)}>
        <div className="flex items-center justify-between pb-7">
          <h3 className="before:content-'' relative mt-1.5 bg-light text-lg font-semibold text-heading before:absolute before:-top-0.5 before:h-8 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-7 rtl:before:-right-7">
            {t(title)}
          </h3>
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
          rowKey="category_id"
          scroll={{ x: 200 }}
        />
      </div>
    </React.Fragment>
  );
}
