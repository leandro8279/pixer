import { API_ENDPOINTS } from '@/config/endpoints';
import { Category, CategoryPaginator, CategoryQueryOptions, GetParams } from '@/types';

import { BaseService } from './base';

export class CategoryService extends BaseService {
  paginated = ({ type, name, self, ...params }: Partial<CategoryQueryOptions>) => {
    const search = this.formatSearchParams({ type, name });
    return this.get<CategoryPaginator>(API_ENDPOINTS.CATEGORIES, { searchJoin: 'and', self, ...params, search });
  };

  find = ({ slug, language }: GetParams) => {
    return this.get<Category>(`${API_ENDPOINTS.CATEGORIES}/${slug}`, { language });
  };
}
