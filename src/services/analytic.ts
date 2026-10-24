import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

export class AnalyticService extends BaseService {
  analytics = () => {
    return this.get<any>(API_ENDPOINTS.ANALYTICS);
  };
}
