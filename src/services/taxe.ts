import { API_ENDPOINTS } from '@/config/endpoints';
import { Tax, TaxQueryOptions } from '@/types';

import { BaseService } from './base';

export class TaxeService extends BaseService {
  all = ({ name, ...params }: Partial<TaxQueryOptions>) => {
    const search = this.formatSearchParams({ name });
    return this.get<Tax[]>(API_ENDPOINTS.TAXES, { searchJoin: 'and', ...params, search });
  };
}
