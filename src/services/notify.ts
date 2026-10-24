import { API_ENDPOINTS } from '@/config/endpoints';
import { NotifyLogsPaginator, NotifyLogsQueryOptions } from '@/types';

import { BaseService } from './base';

export class NotifyService extends BaseService {
  notifyLogSeen = ({ input }: { input: any }) => {
    return this.post<any>(API_ENDPOINTS.NOTIFY_LOG_SEEN, input);
  };

  paginated = ({ notify_type, is_read, ...params }: Partial<NotifyLogsQueryOptions>) => {
    const search = this.formatSearchParams({ notify_type, is_read });

    return this.get<NotifyLogsPaginator>(API_ENDPOINTS.NOTIFY_LOGS, { searchJoin: 'and', notify_type, is_read, ...params, search });
  };

  readAllNotifyLogs = ({ ...params }: Partial<NotifyLogsQueryOptions>) => {
    return this.post<any>(API_ENDPOINTS.READ_ALL_NOTIFY_LOG, { ...params });
  };
}
