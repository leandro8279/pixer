import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

import type { Settings, SettingsInput } from '@/types';

export class SettingsService extends BaseService {
  all = (data: { language: string }) => {
    return this.get<Settings>(API_ENDPOINTS.SETTINGS, data);
  };

  update = (data: SettingsInput) => {
    return this.post<Settings>(API_ENDPOINTS.SETTINGS, data);
  };
}
