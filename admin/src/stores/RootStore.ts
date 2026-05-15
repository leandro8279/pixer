import { RootService } from '@/services/root.service';
import { AppStore } from '@/stores/AppStore';
import { AuthStore } from '@/stores/AuthStore';
import { SettingStore } from '@/stores/SettingStore';

export class RootStore {
  readonly app: AppStore;
  readonly auth: AuthStore;
  readonly setting: SettingStore;

  constructor(readonly service: RootService) {
    this.app = new AppStore();
    this.auth = new AuthStore(service);
    this.setting = new SettingStore(service);
  }
}
