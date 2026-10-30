import { makeAutoObservable } from 'mobx';

export class AppStore {
  _state = {
    miniSidebar: false,
    displaySidebar: false,
    isMaintenanceMode: false,
    displayCartSidebar: false,
    isMaintenanceModeStart: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get miniSidebar() {
    return this._state.miniSidebar;
  }

  get isMaintenanceMode() {
    return this._state.isMaintenanceMode;
  }

  get isMaintenanceModeStart() {
    return this._state.isMaintenanceModeStart;
  }

  get displaySidebar() {
    return this._state.displaySidebar;
  }

  get displayCartSidebar() {
    return this._state.displayCartSidebar;
  }

  setMiniSidebar(value: boolean) {
    this._state.miniSidebar = value;
  }

  setUnderMaintenance(value: boolean) {
    this._state.isMaintenanceMode = value;
  }

  setUnderMaintenanceStart(value: boolean) {
    this._state.isMaintenanceModeStart = value;
  }

  closeSidebar() {}

  toggleSidebar() {}

  openCartSidebar() {}

  closeCartSidebar() {}
}
