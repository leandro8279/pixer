import type { RootService } from '@/services/root.service';
import { API_ENDPOINTS } from '@/utils/constants';

import { computed, makeObservable } from 'mobx';

import { MobxQuery } from './MobxQuery';

export class SettingStore {
  constructor(private readonly service: RootService) {
    makeObservable(this, {
      settings: computed,
      settingsQuery: computed,
    });
  }

  readonly #settings = new MobxQuery({
    enabled: false,
    queryKey: [API_ENDPOINTS.SETTINGS, 'pt'],
    queryFn: () => this.service.settings.all({ language: 'pt' }),
  });

  get settingsQuery() {
    return this.#settings.query({
      enabled: true,
      queryKey: [API_ENDPOINTS.SETTINGS, 'pt'],
      queryFn: () => this.service.settings.all({ language: 'pt' }),
    });
  }

  get settings() {
    return this.settingsQuery.data || null;
  }

  dispose() {
    this.#settings.dispose();
  }
}
