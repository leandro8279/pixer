import RCPagination from 'rc-pagination';
import type { PaginationProps } from 'rc-pagination';
import { ArrowNext } from '@/components/icons/arrow-next';
import { ArrowPrev } from '@/components/icons/arrow-prev';
import 'rc-pagination/assets/index.css';

export function Pagination(props: PaginationProps) {
  return (
    <RCPagination
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
}

export default Pagination;
