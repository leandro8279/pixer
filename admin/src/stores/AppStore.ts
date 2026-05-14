import { makeAutoObservable } from 'mobx';

export class AppStore {
  miniSidebar = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMiniSidebar(value: boolean) {
    this.miniSidebar = value;
  }
}
