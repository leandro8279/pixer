import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

import type { GetParams, Type, TypeInput, TypeQueryOptions } from '@/types';

export class TypeService extends BaseService {
  all = ({ name, ...params }: Partial<TypeQueryOptions>) => {
    const search = this.formatSearchParams({ name });

    return this.get<Type[]>(API_ENDPOINTS.TYPES, { searchJoin: 'and', ...params, search });
  };

  findBy = (params: GetParams) => {
    return this.get<Type>(API_ENDPOINTS.TYPES, params);
  };

  create = (data: TypeInput) => {
    return this.post<Type>(API_ENDPOINTS.TYPES, data);
  };

  update = ({ id, ...input }: Partial<TypeInput> & { id: string }) => {
    return this.put<Type>(`${API_ENDPOINTS.TYPES}/${id}`, input);
  };

  remove = ({ id }: { id: string }) => {
    return this.delete<boolean>(`${API_ENDPOINTS.TYPES}/${id}`);
  };
}
