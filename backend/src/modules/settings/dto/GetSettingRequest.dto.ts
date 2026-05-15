import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class GetSettingRequestDTO {
  @IsString({ message: 'O campo language deve ser uma string.' })
  @ApiProperty({
    description: 'O idioma para o qual recuperar a configuração.',
    example: 'pt',
  })
  language: string;
}
