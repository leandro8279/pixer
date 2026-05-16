import { API_ENDPOINTS } from '@/utils/constants';

import { BaseService } from './base.service';

import type { Shop } from '@/types';

export class ShopService extends BaseService {
  getShop = async (slug: string) => {
    return this.get<Shop>(API_ENDPOINTS.SHOPS + `/${slug}`);
  };
}
