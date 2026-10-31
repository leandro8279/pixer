import i18next from 'i18next';
import { action, computed, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { AuthResponse, RegisterInput, SortOrder, UserPaginator, UserQueryOptions } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { keepPreviousData } from '@tanstack/react-query';

import { MobxMutation } from './mutation';
import { MobxQuery } from './query';
import { RootStore } from './root';

const initialParams = { page: 1, limit: 20, name: '', orderBy: 'created_at', sortedBy: SortOrder.Desc };

export class UserStore {
  readonly _state = {
    params: {} as Partial<UserQueryOptions>,
    adminUsersparams: {} as Partial<UserQueryOptions>,
    vendorsParams: {} as Partial<UserQueryOptions>,
    customersParams: {} as Partial<UserQueryOptions>,
    staffsParams: {} as Partial<UserQueryOptions>,
    userStaffsParams: {} as Partial<UserQueryOptions & { shop_id: string }>,
  };

  constructor(
    private readonly root: RootStore,
    private readonly service: RootService,
  ) {
    makeObservable(this, {
      _state: observable,

      users: computed,
      usersQuery: computed,
      paginatorInfo: computed,

      customers: computed,
      customersQuery: computed,
      customersPaginatorInfo: computed,

      adminUsers: computed,
      adminUsersQuery: computed,
      adminUsersPaginatorInfo: computed,

      userStaffs: computed,
      userStaffsQuery: computed,
      userStaffsPaginatorInfo: computed,

      vendors: computed,
      vendorsQuery: computed,
      vendorsPaginatorInfo: computed,

      staffs: computed,
      staffsQuery: computed,
      staffsPaginatorInfo: computed,

      setParams: action,
      setStaffsParams: action,
      setVendorsParams: action,
      setCustomersParams: action,
      setAdminUsersParams: action,
      setUserStaffsParams: action,
    });
  }

  readonly #users = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.fetchUsers(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #adminUsers = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.fetchAdmins(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #vendors = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.fetchVendors(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #customers = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.fetchCustomers(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #userStaffs = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.getMyStaffs(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #staffs = new MobxQuery<UserPaginator, Error>({
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey, pageParam }) => this.service.user.getAllStaffs(Object.assign({}, queryKey[1], pageParam)),
  });

  readonly #register = new MobxMutation<AuthResponse, Error, RegisterInput>({
    onSettled: () => this.usersRefetch(),
    mutationFn: (variables) => this.service.auth.register(variables),
    onSuccess: () => toast.success(i18next.t('successfully-register'), { toastId: 'successRegister' }),
  });

  get usersQuery() {
    return this.#users.query({
      queryKey: [API_ENDPOINTS.USERS, this._state.params],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.params).length),
    });
  }

  private usersRefetch() {
    this.setParams(initialParams);
    this.usersQuery.refetch();
  }

  get adminUsersQuery() {
    return this.#adminUsers.query({
      queryKey: [API_ENDPOINTS.ADMIN_LIST, this._state.adminUsersparams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.adminUsersparams).length),
    });
  }

  get vendorsQuery() {
    return this.#vendors.query({
      queryKey: [API_ENDPOINTS.VENDORS_LIST, this._state.vendorsParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.vendorsParams).length),
    });
  }

  get customersQuery() {
    return this.#customers.query({
      queryKey: [API_ENDPOINTS.CUSTOMERS, this._state.customersParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.customersParams).length),
    });
  }

  get userStaffsQuery() {
    return this.#userStaffs.query({
      queryKey: [API_ENDPOINTS.MY_STAFFS, this._state.userStaffsParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.userStaffsParams).length),
    });
  }

  get staffsQuery() {
    return this.#staffs.query({
      queryKey: [API_ENDPOINTS.ALL_STAFFS, this._state.staffsParams],
      enabled: Boolean(this.root.auth.isAuthenticated && Object.keys(this._state.staffsParams).length),
    });
  }

  get users() {
    return this.usersQuery.data?.data || [];
  }

  get adminUsers() {
    return this.adminUsersQuery.data?.data || [];
  }

  get vendors() {
    return this.vendorsQuery.data?.data || [];
  }

  get customers() {
    return this.customersQuery.data?.data || [];
  }

  get userStaffs() {
    return this.userStaffsQuery.data?.data || [];
  }

  get staffs() {
    return this.staffsQuery.data?.data || [];
  }

  get paginatorInfo() {
    return mapPaginatorData(this.usersQuery.data);
  }

  get adminUsersPaginatorInfo() {
    return mapPaginatorData(this.adminUsersQuery.data);
  }

  get vendorsPaginatorInfo() {
    return mapPaginatorData(this.vendorsQuery.data);
  }

  get customersPaginatorInfo() {
    return mapPaginatorData(this.customersQuery.data);
  }

  get userStaffsPaginatorInfo() {
    return mapPaginatorData(this.userStaffsQuery.data);
  }

  get register() {
    return this.#register;
  }

  get staffsPaginatorInfo() {
    return mapPaginatorData(this.staffsQuery.data);
  }

  setParams(value: Partial<UserQueryOptions>) {
    this._state.params = value;
  }

  setAdminUsersParams(value: Partial<UserQueryOptions>) {
    this._state.adminUsersparams = value;
  }

  setVendorsParams(value: Partial<UserQueryOptions>) {
    this._state.vendorsParams = value;
  }

  setCustomersParams(value: Partial<UserQueryOptions>) {
    this._state.customersParams = value;
  }

  setUserStaffsParams(value: Partial<UserQueryOptions & { shop_id: string }>) {
    this._state.userStaffsParams = value;
  }

  setStaffsParams(value: Partial<UserQueryOptions>) {
    this._state.staffsParams = value;
  }

  dispose() {
    this.#users.dispose();
    this.#adminUsers.dispose();
    this.#vendors.dispose();
    this.#customers.dispose();
    this.#userStaffs.dispose();
    this.#staffs.dispose();
    this.#register.dispose();
  }
}
