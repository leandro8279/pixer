import { API_ENDPOINTS } from '@/utils/constants';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types';
import { BaseService } from './base.service';

class AuthService extends BaseService {
  private static _instance: AuthService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

  login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`/auth/${API_ENDPOINTS.TOKEN}`, data);
  }

  register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post<RegisterResponse>(`/auth/${API_ENDPOINTS.REGISTER}`, data);
  }
}

export const authService = AuthService.getInstance();
