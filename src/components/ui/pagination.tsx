import "rc-pagination/assets/index.css";

import RCPagination from "rc-pagination";

import { ArrowNext } from "@/components/icons/arrow-next";
import { ArrowPrev } from "@/components/icons/arrow-prev";

import type { PaginationProps } from "rc-pagination";
export function Pagination(props: PaginationProps) {
  return <RCPagination nextIcon={<ArrowNext />} prevIcon={<ArrowPrev />} {...props} />;
}
