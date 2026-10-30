import { API_ENDPOINTS } from '@/config/endpoints';
import { Tax, TaxQueryOptions } from '@/types';

import { BaseService } from './base';

export class TaxeService extends BaseService {
  all = ({ name, ...params }: Partial<TaxQueryOptions>) => {
    const search = this.formatSearchParams({ name });
    return this.get<Tax[]>(API_ENDPOINTS.TAXES, { searchJoin: 'and', ...params, search });
  };

  create = (data: Tax) => {
    return this.post<Tax>(API_ENDPOINTS.TAXES, data);
  };

  update = ({ id, ...input }: Partial<Tax> & { id: string }) => {
    return this.put<Tax>(`${API_ENDPOINTS.TAXES}/${id}`, input);
  };

  remove = ({ id }: { id: string }) => {
    return this.delete<boolean>(`${API_ENDPOINTS.TAXES}/${id}`);
  };
}
