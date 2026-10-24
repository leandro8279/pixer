import { API_ENDPOINTS } from '@/config/endpoints';
import { Author, AuthorPaginator, AuthorQueryOptions, GetParams } from '@/types';

import { BaseService } from './base';

export class AuthorService extends BaseService {
  paginated = ({ type, name, is_approved, ...params }: Partial<AuthorQueryOptions>) => {
    const search = this.formatSearchParams({ type, name, is_approved });

    return this.get<AuthorPaginator>(API_ENDPOINTS.AUTHORS, { searchJoin: 'and', ...params, search });
  };

  find = ({ slug, language }: GetParams) => {
    return this.get<Author>(`${API_ENDPOINTS.AUTHORS}/${slug}`, { language });
  };
}
