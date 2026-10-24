import { computed, makeObservable } from 'mobx';

import { API_ENDPOINTS } from '@/config/endpoints';
import { RootService } from '@/services/root';
import { Settings } from '@/types';

import { MobxQuery } from './query';

export class SettingStore {
  constructor(private readonly service: RootService) {
    makeObservable(this, { settings: computed, settingsQuery: computed });
  }

  readonly #settings = new MobxQuery<Settings, Error>({
    queryFn: () => this.service.settings.all({ language: 'pt' }),
  });

  get settingsQuery() {
    return this.#settings.query({ queryKey: [API_ENDPOINTS.SETTINGS, 'pt'] });
  }

  get settings() {
    return this.settingsQuery.data || null;
  }

  dispose() {
    this.#settings.dispose();
  }
}
