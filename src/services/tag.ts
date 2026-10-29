import { API_ENDPOINTS } from '@/config/endpoints';
import { Tag, TagInput, TagPaginator, TagQueryOptions } from '@/types';

import { BaseService } from './base';

export class TagService extends BaseService {
  paginated = ({ type, name, ...params }: Partial<TagQueryOptions>) => {
    const search = this.formatSearchParams({ type, name });
    return this.get<TagPaginator>(API_ENDPOINTS.TAGS, { searchJoin: 'and', ...params, search });
  };

  create = (data: TagInput) => {
    return this.post<Tag>(API_ENDPOINTS.TAGS, data);
  };

  update = ({ id, ...input }: Partial<TagInput> & { id: string }) => {
    return this.put<Tag>(`${API_ENDPOINTS.TAGS}/${id}`, input);
  };

  remove = ({ id }: { id: string }) => {
    return this.delete<boolean>(`${API_ENDPOINTS.TAGS}/${id}`);
  };
}
