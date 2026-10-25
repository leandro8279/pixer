import { API_ENDPOINTS } from '@/config/endpoints';
import { FAQsPaginator, FAQsQueryOptions } from '@/types';

import { BaseService } from './base';

export class FaqService extends BaseService {
  paginated = ({ faq_title, shop_id, ...params }: Partial<FAQsQueryOptions>) => {
    const search = this.formatSearchParams({ faq_title, shop_id });

    return this.get<FAQsPaginator>(API_ENDPOINTS.FAQS, { searchJoin: 'and', shop_id: shop_id, ...params, search });
  };
}
