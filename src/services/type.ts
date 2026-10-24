import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

import type { GetParams, Type, TypeQueryOptions } from '@/types';

export class TypeService extends BaseService {
  all = ({ name, ...params }: Partial<TypeQueryOptions>) => {
    const search = this.formatSearchParams({ name });

    return this.get<Type[]>(API_ENDPOINTS.TYPES, { searchJoin: 'and', ...params, search });
  };

  findBy = (params: GetParams) => {
    return this.get<Type>(API_ENDPOINTS.TYPES, params);
  };
}
