import { AuthService, authService } from './auth.service';
import { BaseService } from './base.service';
import { SettingService } from './setting.service';

export class RootService extends BaseService {
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

  readonly auth: AuthService = authService;
  readonly settings = new SettingService();
}

export const rootService = RootService.getInstance();
