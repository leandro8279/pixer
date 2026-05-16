import { ListShopsResponseDTO } from '@/modules/shops/dto';
import { Shop } from '@/modules/shops/entities/Shop';

export const LIST_SHOP_FORMATTER = Symbol('IListShopsFormatter');

export interface IListShopsFormatter {
  format(params: IListShopsFormatter.Params): IListShopsFormatter.Result;
}

export namespace IListShopsFormatter {
  export interface Params {
    shops: Shop[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  }

  export type Result = ListShopsResponseDTO;
}
