import { API_ENDPOINTS } from '@/config/endpoints';
import { UserPaginator, UserQueryOptions } from '@/types';

import { BaseService } from './base';

export class UserService extends BaseService {
  fetchUsers = ({ name, ...params }: Partial<UserQueryOptions>) => {
    const search = this.formatSearchParams({ name });
    return this.get<UserPaginator>(API_ENDPOINTS.USERS, { searchJoin: 'and', with: 'wallet', ...params, search });
  };

  fetchAdmins = ({ ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.ADMIN_LIST, { searchJoin: 'and', with: 'wallet;permissions;profile', ...params });
  };

  fetchVendors = ({ is_active, ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.VENDORS_LIST, { searchJoin: 'and', with: 'wallet;permissions;profile', is_active, ...params });
  };

  fetchCustomers = ({ ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.CUSTOMERS, { searchJoin: 'and', with: 'wallet', ...params });
  };

  getMyStaffs = ({ is_active, shop_id, name, ...params }: Partial<UserQueryOptions & { shop_id: string }>) => {
    const search = this.formatSearchParams({ name, is_active });

    return this.get<UserPaginator>(API_ENDPOINTS.MY_STAFFS, { searchJoin: 'and', shop_id, ...params, search });
  };

  getAllStaffs = ({ is_active, name, ...params }: Partial<UserQueryOptions>) => {
    const search = this.formatSearchParams({ name, is_active });

    return this.get<UserPaginator>(API_ENDPOINTS.ALL_STAFFS, { searchJoin: 'and', ...params, search });
  };
}
