import type { WithdrawPaginator, WithdrawQueryOptions } from '@/types';
import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

export class WithdrawService extends BaseService {
  paginated = ({ shop_id, ...params }: Partial<WithdrawQueryOptions>) => {
    const search = this.formatSearchParams({ shop_id });

    return this.get<WithdrawPaginator>(API_ENDPOINTS.WITHDRAWS, { shop_id, searchJoin: 'and', ...params, search });
  };
}
