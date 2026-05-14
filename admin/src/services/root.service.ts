import { BaseService } from './base.service';

class RootService extends BaseService {
  private static _instance: RootService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): RootService {
    if (!RootService._instance) {
      RootService._instance = new RootService();
    }
    return RootService._instance;
  }

  auth = {
    login: <T>(data: unknown) => this.post<T>('/auth/login', data),
    register: <T>(data: unknown) => this.post<T>('/auth/register', data),
    logout: <T>() => this.post<T>('/auth/logout'),
    me: <T>() => this.get<T>('/auth/me'),
    refreshToken: <T>(data: unknown) =>
      this.post<T>('/auth/token/refresh', data),
  };

  settings = {
    all: <T>(params?: unknown) =>
      this.get<T>('/settings', { params } as any),
    update: <T>(data: unknown) => this.put<T>('/settings', data),
  };

  upload = {
    upload: <T>(formData: FormData) =>
      this.post<T>('/attachments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    delete: <T>(id: number | string) =>
      this.delete<T>(`/attachments/${id}`),
  };
}

export const rootService = RootService.getInstance();
