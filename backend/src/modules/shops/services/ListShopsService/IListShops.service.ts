import { Shop } from '@/modules/shops/entities/Shop';

import { PaginatedResult } from '../../repositories';

export const LIST_SHOP_SERVICE = Symbol('IListShopsService');

export interface IListShopsService {
  execute(params: IListShopsService.Params): Promise<IListShopsService.Result>;
}

export namespace IListShopsService {
  export type Params = {
    page: number;
    limit: number;
    language?: string;
    search?: string;
    searchJoin?: string;
    isActive?: boolean;
  };
  export type Result = PaginatedResult<Shop>;
}
