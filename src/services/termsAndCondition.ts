import { API_ENDPOINTS } from '@/config/endpoints';
import { TermsAndConditionsPaginator, TermsAndConditionsQueryOptions } from '@/types';

import { BaseService } from './base';

export class TermsAndConditionService extends BaseService {
  paginated = ({ title, shop_id, ...params }: Partial<TermsAndConditionsQueryOptions>) => {
    const search = this.formatSearchParams({ title, shop_id });

    return this.get<TermsAndConditionsPaginator>(API_ENDPOINTS.TERMS_AND_CONDITIONS, { searchJoin: 'and', shop_id: shop_id, ...params, search });
  };
}
