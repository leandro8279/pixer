import { AppStore } from './AppStore';
import { RootService } from '@/services/root.service';

export class RootStore {
  readonly app: AppStore;

  constructor(readonly service: RootService) {
    this.app = new AppStore();
  }
}
