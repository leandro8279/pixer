import { ShopResponseDTO } from '@/modules/shops/dto';

export const GET_SHOP_SERVICE = Symbol('IGetShopService');

export interface IGetShopService {
  execute(params: IGetShopService.Params): Promise<IGetShopService.Result>;
}

export namespace IGetShopService {
  export type Params = {
    idOrSlug: string;
    language: string;
    requestingUserId?: string;
    requestingUserPermissions?: string[];
    requestingUserShopIds?: string[];
  };
  export type Result = ShopResponseDTO;
}
