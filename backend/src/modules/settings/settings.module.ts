import { SettingsController } from '@/modules/settings/controllers/Settings.controller';
import { Setting } from '@/modules/settings/entities/Setting';
import { SETTING_REPOSITORY, SettingsRepository } from '@/modules/settings/repositories';
import { GET_SETTING_SERVICE, GetSettingsService } from '@/modules/settings/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [
    {
      provide: SETTING_REPOSITORY,
      useClass: SettingsRepository,
    },
    {
      provide: GET_SETTING_SERVICE,
      useClass: GetSettingsService,
    },
  ],
})
export class SettingsModule {}
