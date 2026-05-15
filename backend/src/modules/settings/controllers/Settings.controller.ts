import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetSettingRequestDTO, GetSettingResponseDTO } from '../dto';
import { GET_SETTING_SERVICE, IGetSettingsService } from '../services';

@Controller('settings')
@ApiTags('Configurações')
export class SettingsController {
  constructor(
    @Inject(GET_SETTING_SERVICE)
    private readonly getSettingService: IGetSettingsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obter configurações globais',
    description:
      'Retorna as configurações da plataforma para o idioma solicitado, com fallback para o idioma padrão (en). ' +
      'Inclui no nível raiz o campo `maintenance` com as datas start/until formatadas. Rota pública.',
  })
  @ApiQuery({ type: GetSettingRequestDTO, description: 'Idioma das configurações' })
  @ApiResponse({ status: 200, type: GetSettingResponseDTO, description: 'Configurações encontradas' })
  async index(@Query() query?: GetSettingRequestDTO) {
    const { language = 'en' } = query;

    return this.getSettingService.execute({ language });
  }
}
