import { GetSettingRequestDTO, GetSettingResponseDTO } from '@/modules/settings/dto';

export const GET_SETTING_SERVICE = Symbol('IGetSettingsService');

export interface IGetSettingsService {
  execute(params: IGetSettingsService.Params): Promise<IGetSettingsService.Result>;
}

export namespace IGetSettingsService {
  export type Params = GetSettingRequestDTO;
  export type Result = GetSettingResponseDTO;

  export type SettingsWithMaintenance = Result & {
    maintenance?: { start: string; until: string };
  };
}
