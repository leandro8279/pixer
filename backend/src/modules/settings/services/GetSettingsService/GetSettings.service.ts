import { ISettingsRepository, SETTING_REPOSITORY } from '@/modules/settings/repositories/SettingsRepository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IGetSettingsService } from './IGetSettings.service';

@Injectable()
export class GetSettingsService implements IGetSettingsService {
  constructor(
    @Inject(SETTING_REPOSITORY)
    private readonly settingsRepository: ISettingsRepository,
  ) {}

  private formatMaintenanceDate(value: unknown): string {
    if (!value) return '';
    try {
      const date = new Date(String(value));
      if (isNaN(date.getTime())) return String(value);
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return String(value);
    }
  }

  public async execute(params: IGetSettingsService.Params): Promise<IGetSettingsService.Result> {
    const record = await this.settingsRepository.getByLanguage(params.language);

    if (!record) {
      throw new NotFoundException('Configurações não encontradas para o idioma especificado.');
    }

    const opts = record.options as Record<string, unknown> | null;
    const maintenance = opts?.maintenance as Record<string, unknown> | undefined;

    const result: IGetSettingsService.SettingsWithMaintenance = { ...record };

    if (maintenance) {
      result.maintenance = {
        start: this.formatMaintenanceDate(maintenance.start),
        until: this.formatMaintenanceDate(maintenance.until),
      };
    }

    return result;
  }
}
