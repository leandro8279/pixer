import type { Settings } from '@/types';
import { BaseService } from './base.service';

export class SettingService extends BaseService {
  public async all({ language }: { language: string }) {
    return this.get<Settings>('/settings', { params: { language } });
  }
}
