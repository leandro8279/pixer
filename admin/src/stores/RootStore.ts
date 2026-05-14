import { AppStore } from './AppStore';

export class RootStore {
  readonly app: AppStore;

  constructor() {
    this.app = new AppStore();
  }
}
