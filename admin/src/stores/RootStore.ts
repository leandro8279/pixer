import { AppStore } from './AppStore';
import { AuthStore } from './AuthStore';
import { RootService } from '@/services/root.service';

export class RootStore {
  readonly app: AppStore;
  readonly auth: AuthStore;

  constructor(readonly service: RootService) {
    this.app = new AppStore();
    this.auth = new AuthStore(service);
  }
}
