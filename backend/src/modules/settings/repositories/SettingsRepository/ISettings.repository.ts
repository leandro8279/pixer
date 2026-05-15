import { Setting } from '@/modules/settings/entities/Setting';

export const SETTING_REPOSITORY = Symbol('ISettingsRepository');

export type CreateSettingData = Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSettingData = Partial<Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>>;

export interface ISettingsRepository {
  create(params: CreateSettingData): Promise<Setting>;
  update(id: string, params: UpdateSettingData): Promise<Setting>;
  getByLanguage(language: string): Promise<Setting | null>;
}
