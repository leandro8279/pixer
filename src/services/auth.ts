import { API_ENDPOINTS } from "@/config/endpoints";

import { BaseService } from "./base";

import type {
  AuthResponse,
  BlockUserInput,
  ChangePasswordInput,
  ForgetPasswordInput,
  KeyInput,
  LoginInput,
  MakeAdminInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateUser,
  User,
  UserPaginator,
  UserQueryOptions,
  VerifyForgetPasswordTokenInput,
  WalletPointsInput,
} from "@/types";

export class AuthService extends BaseService {
  me = () => {
    return this.get<User>(API_ENDPOINTS.ME);
  };

  login = (variables: LoginInput) => {
    return this.post<AuthResponse>(API_ENDPOINTS.TOKEN, variables);
  };

  logout = () => {
    return this.post<void>(API_ENDPOINTS.LOGOUT, {});
  };

  register = (variables: RegisterInput) => {
    return this.post<AuthResponse>(API_ENDPOINTS.REGISTER, variables);
  };

  update = ({ id, input }: { id: string; input: UpdateUser }) => {
    return this.put<User>(`${API_ENDPOINTS.USERS}/${id}`, input);
  };

  changePassword = (variables: ChangePasswordInput) => {
    return this.post<any>(API_ENDPOINTS.CHANGE_PASSWORD, variables);
  };

  forgetPassword = (variables: ForgetPasswordInput) => {
    return this.post<any>(API_ENDPOINTS.FORGET_PASSWORD, variables);
  };

  verifyForgetPasswordToken = (variables: VerifyForgetPasswordTokenInput) => {
    return this.post<any>(API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN, variables);
  };

  resetPassword = (variables: ResetPasswordInput) => {
    return this.post<any>(API_ENDPOINTS.RESET_PASSWORD, variables);
  };

  makeAdmin = (variables: MakeAdminInput) => {
    return this.post<any>(API_ENDPOINTS.MAKE_ADMIN, variables);
  };

  block = (variables: BlockUserInput) => {
    return this.post<any>(API_ENDPOINTS.BLOCK_USER, variables);
  };

  unblock = (variables: BlockUserInput) => {
    return this.post<any>(API_ENDPOINTS.UNBLOCK_USER, variables);
  };

  addWalletPoints = (variables: WalletPointsInput) => {
    return this.post<any>(API_ENDPOINTS.ADD_WALLET_POINTS, variables);
  };

  addLicenseKey = (variables: KeyInput) => {
    return this.post<any>(API_ENDPOINTS.ADD_LICENSE_KEY_VERIFY, variables);
  };

  fetchUsers = ({ name, ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.USERS, { searchJoin: "and", with: "wallet", ...params, search: this.formatSearchParams({ name }) });
  };

  fetchAdmins = ({ ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.ADMIN_LIST, { searchJoin: "and", with: "wallet;permissions;profile", ...params });
  };

  fetchUser = ({ id }: { id: string }) => {
    return this.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  };

  resendVerificationEmail = () => {
    return this.post<any>(API_ENDPOINTS.SEND_VERIFICATION_EMAIL, {});
  };

  updateEmail = ({ email }: { email: string }) => {
    return this.post<any>(API_ENDPOINTS.UPDATE_EMAIL, { email });
  };

  fetchVendors = ({ is_active, ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.VENDORS_LIST, { searchJoin: "and", with: "wallet;permissions;profile", is_active, ...params });
  };

  fetchCustomers = ({ ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.CUSTOMERS, { searchJoin: "and", with: "wallet", ...params });
  };

  getMyStaffs = ({ is_active, shop_id, name, ...params }: Partial<UserQueryOptions & { shop_id: string }>) => {
    const search = this.formatSearchParams({ name, is_active });

    return this.get<UserPaginator>(API_ENDPOINTS.MY_STAFFS, { searchJoin: "and", shop_id, ...params, search });
  };

  getAllStaffs = ({ is_active, name, ...params }: Partial<UserQueryOptions>) => {
    return this.get<UserPaginator>(API_ENDPOINTS.ALL_STAFFS, { searchJoin: "and", ...params, search: this.formatSearchParams({ name, is_active }) });
  };
}
