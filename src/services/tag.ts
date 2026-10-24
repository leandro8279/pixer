import { API_ENDPOINTS } from '@/config/endpoints';
import { TagPaginator, TagQueryOptions } from '@/types';

import { BaseService } from './base';

export class TagService extends BaseService {
  paginated = ({ type, name, ...params }: Partial<TagQueryOptions>) => {
    const search = this.formatSearchParams({ type, name });
    return this.get<TagPaginator>(API_ENDPOINTS.TAGS, { searchJoin: 'and', ...params, search });
  };
}
