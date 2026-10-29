import { API_ENDPOINTS } from '@/config/endpoints';
import { Category, CategoryInput, CategoryPaginator, CategoryQueryOptions, GetParams } from '@/types';

import { BaseService } from './base';

export class CategoryService extends BaseService {
  paginated = ({ type, name, self, ...params }: Partial<CategoryQueryOptions>) => {
    const search = this.formatSearchParams({ type, name });
    return this.get<CategoryPaginator>(API_ENDPOINTS.CATEGORIES, { searchJoin: 'and', self, ...params, search });
  };

  find = ({ slug, language }: GetParams) => {
    return this.get<Category>(`${API_ENDPOINTS.CATEGORIES}/${slug}`, { language });
  };

  create = (data: CategoryInput) => {
    return this.post<Category>(API_ENDPOINTS.CATEGORIES, data);
  };

  update = ({ id, ...input }: Partial<CategoryInput> & { id: string }) => {
    return this.put<Category>(`${API_ENDPOINTS.CATEGORIES}/${id}`, input);
  };

  remove = ({ id }: { id: string }) => {
    return this.delete<boolean>(`${API_ENDPOINTS.CATEGORIES}/${id}`);
  };
}
