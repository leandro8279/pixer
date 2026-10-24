import { API_ENDPOINTS } from '@/config/endpoints';
import { ManufacturerPaginator, ManufacturerQueryOptions } from '@/types';

import { BaseService } from './base';

export class ManufacturerService extends BaseService {
  paginated = ({ name, shop_id, ...params }: Partial<ManufacturerQueryOptions>) => {
    const search = this.formatSearchParams({ name, shop_id });
    return this.get<ManufacturerPaginator>(API_ENDPOINTS.MANUFACTURERS, { searchJoin: 'and', ...params, search });
  };
}
