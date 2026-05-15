import { makeAutoObservable } from 'mobx';

export class AppStore {
  miniSidebar = false;
  isMaintenanceMode = false;
  isMaintenanceModeStart = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMiniSidebar(value: boolean) {
    this.miniSidebar = value;
  }

  setIsMaintenanceMode(value: boolean) {
    this.isMaintenanceMode = value;
  }

  setUnderMaintenanceStart(value: boolean) {
    this.isMaintenanceModeStart = value;
  }
}
