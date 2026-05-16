import { API_ENDPOINTS } from '@/utils/constants';

import { BaseService } from './base.service';

import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/types';
export class AuthService extends BaseService {
  login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`/auth/${API_ENDPOINTS.TOKEN}`, data);
  }

  register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post<RegisterResponse>(`/auth/${API_ENDPOINTS.REGISTER}`, data);
  }

  me(): Promise<User> {
    return this.get(API_ENDPOINTS.ME);
  }
}
