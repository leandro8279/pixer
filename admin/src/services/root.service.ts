import { BaseService } from './base.service';
import { AuthService, authService } from './auth.service';

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

  auth: AuthService = authService;

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
