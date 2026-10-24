import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

import type { Shop, ShopInput, ShopPaginator, ShopQueryOptions } from '@/types';

export class ShopService extends BaseService {
  findById = ({ slug }: { slug: string }) => {
    return this.get<Shop>(`${API_ENDPOINTS.SHOPS}/${slug}`);
  };

  paginated = ({ name, ...params }: Partial<ShopQueryOptions>) => {
    const search = this.formatSearchParams({ name });

    return this.get<ShopPaginator>(API_ENDPOINTS.SHOPS, { searchJoin: 'and', ...params, search });
  };

  create = (data: ShopInput) => {
    return this.post<Shop>(API_ENDPOINTS.SHOPS, data);
  };

  update = ({ id, ...input }: Partial<ShopInput> & { id: string }) => {
    return this.put<Shop>(`${API_ENDPOINTS.SHOPS}/${id}`, input);
  };

  remove = ({ id }: { id: string }) => {
    return this.delete<boolean>(`${API_ENDPOINTS.SHOPS}/${id}`);
  };
}
