import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { SettingService } from './setting.service';
import { ShopService } from './shop.service';

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

  readonly auth = new AuthService();
  readonly settings = new SettingService();
  readonly shop = new ShopService();
}

export const rootService = RootService.getInstance();
