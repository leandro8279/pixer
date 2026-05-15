import { Setting } from '@/modules/settings/entities/Setting';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateSettingData, ISettingsRepository, UpdateSettingData } from './ISettings.repository';

@Injectable()
export class SettingsRepository implements ISettingsRepository {
  private readonly DEFAULT_LANGUAGE = 'en';
  constructor(@InjectRepository(Setting) private repository: Repository<Setting>) {}

  public async create(params: CreateSettingData): Promise<Setting> {
    return this.repository.save(this.repository.create(params));
  }

  public async update(id: string, params: UpdateSettingData): Promise<Setting> {
    await this.repository.update(id, params);

    return this.repository.findOneBy({ id }) as Promise<Setting>;
  }

  public async getByLanguage(language: string): Promise<Setting | null> {
    let record = await this.repository.findOne({
      where: { language },
    });

    if (!record && language !== this.DEFAULT_LANGUAGE) {
      record = await this.repository.findOne({
        where: { language: this.DEFAULT_LANGUAGE },
      });
    }

    if (!record) {
      record = await this.repository.findOne({
        order: { id: 'desc' },
      });
    }

    return record;
  }
}
