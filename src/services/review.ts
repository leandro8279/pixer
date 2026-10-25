import { API_ENDPOINTS } from '@/config/endpoints';
import { ReviewPaginator, ReviewQueryOptions } from '@/types';

import { BaseService } from './base';

export class ReviewService extends BaseService {
  paginated = ({ type, shop_id, ...params }: Partial<ReviewQueryOptions>) => {
    const search = this.formatSearchParams({ type, shop_id });

    return this.get<ReviewPaginator>(API_ENDPOINTS.REVIEWS, { searchJoin: 'and', with: 'product;user', ...params, search });
  };
}
