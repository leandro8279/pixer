import type { MappedPaginatorInfo, Shop, Withdraw } from "@/types";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "wouter";

import { ActionButtons } from "@/components/common/action-buttons";
import { RenderComponent } from "@/components/common/render-component";
import { NoDataFound } from "@/components/icons/no-data-found";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Table } from "@/components/ui/table";
import { Routes } from "@/config/routes";
import { usePrice } from "@/hooks/usePrice";
import { siteSettings } from "@/settings/site.settings";
import { adminOnly, getAuthCredentials, hasAccess } from "@/utils/auth-utils";

import type { ColumnsType } from "rc-table/lib/interface";

interface Props {
  title?: string;
  className?: string;
  withdraws: Withdraw[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
}

export function WithdrawTable(props: Props) {
  const { t } = useTranslation();
  const [searchParam] = useSearchParams();
  const { withdraws, paginatorInfo, onPagination, title, className } = props;

  const renderStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "APPROVED":
        return <Badge text={t("text-approved")} color="bg-accent bg-opacity-10 !text-accent" />;
      case "PENDING":
        return <Badge text={t("text-pending")} color="bg-purple-500 bg-opacity-10 text-purple-500" />;
      case "ON_HOLD":
        return <Badge text={t("text-on-hold")} color="bg-pink-500 bg-opacity-10 text-pink-500" />;
      case "REJECTED":
        return <Badge text={t("text-rejected")} color="bg-red-500 bg-opacity-10 text-red-500" />;
      case "PROCESSING":
        return <Badge text={t("text-processing")} color="bg-yellow-500 bg-opacity-10 text-yellow-600" />;
    }
  };

  let columns: ColumnsType<Withdraw> = [
    {
      title: t("table-item-shop-id"),
      dataIndex: "shop_id",
      key: "shop_id",
      align: "left",
      width: 190,
      render: (id: number) => `#${t("table-item-id")}: ${id}`,
    },
    {
      title: t("table-item-shop"),
      dataIndex: "shop",
      key: "shop",
      align: "left",
      width: 250,
      render: (shop: Shop) => (
        <div className="flex items-center font-medium">
          <div className="relative aspect-square h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-200/80 bg-gray-100 me-2">
            <img src={shop.logo?.thumbnail ?? siteSettings.product.placeholder} alt={shop?.name ?? "Shop Name"} sizes="(max-width: 768px) 100vw" />
          </div>
          <span className="truncate">{shop?.name}</span>
        </div>
      ),
    },
    {
      title: t("table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 200,
      render: function Render(amount: number) {
        const { price } = usePrice({ amount: amount as number });
        return <div className="font-medium">{price}</div>;
      },
    },
    {
      title: t("table-item-created-at"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      width: 300,
      render: (date: string) => {
        dayjs.extend(relativeTime);
        dayjs.extend(utc);
        dayjs.extend(timezone);
        return <span className="whitespace-nowrap">{dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}</span>;
      },
    },
    {
      title: t("table-item-payment-method"),
      dataIndex: "payment_method",
      key: "payment_method",
      align: "left",
      width: 200,
    },
    {
      title: t("table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 220,
      render: (status: string) => renderStatusBadge(status),
    },
    {
      title: t("table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "right",
      width: 120,
      render: (id: string) => {
        const { permissions } = getAuthCredentials();

        if (hasAccess(adminOnly, permissions)) {
          return <ActionButtons detailsUrl={`${Routes.withdraw.list}/${id}`} id={id} />;
        }
        return null;
      },
    },
  ];

  if (searchParam.get("shop")) {
    columns = columns?.filter((column) => column?.key !== "actions");
  }

  return (
    <div className={classNames("overflow-hidden rounded-lg bg-white p-6 md:p-7", className)}>
      <div className="mb-7 mt-1.5 flex items-center justify-between">
        <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
          {title}
        </h3>
        {/* {searchElement} */}
      </div>
      <Table
        columns={columns}
        emptyText={() => (
          <div className="flex flex-col items-center py-7">
            <NoDataFound className="w-52" />
            <div className="mb-1 pt-6 text-base font-semibold text-heading">{t("empty-table-data")}</div>
            <p className="text-[13px]">{t("empty-table-sorry-text")}</p>
          </div>
        )}
        data={withdraws}
        rowKey="id"
        scroll={{ x: 700 }}
      />

      <RenderComponent conditional={!!paginatorInfo?.total}>
        <div className="flex items-center justify-between py-2">
          <div className="mt-2 text-sm text-gray-500">
            {paginatorInfo?.currentPage} of {paginatorInfo?.lastPage} pages
          </div>
          <Pagination total={paginatorInfo?.total} current={paginatorInfo?.currentPage} pageSize={paginatorInfo?.perPage} onChange={onPagination} />
        </div>
      </RenderComponent>
    </div>
  );
}
