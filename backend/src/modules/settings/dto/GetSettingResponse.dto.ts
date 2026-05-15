import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetSettingResponseDTO {
  @ApiProperty({
    description: 'O ID da configuração.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'O idioma para o qual a configuração se aplica.',
    example: 'pt',
  })
  language: string;

  @ApiProperty({
    description: 'As opções de configuração.',
    example: { theme: 'dark', notifications: true },
  })
  options: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Informações sobre a manutenção, se aplicável.',
    example: { start: 'January 1, 2023, 12:00 PM', until: 'January 1, 2023, 2:00 PM' },
    required: false,
  })
  maintenance?: { start: string; until: string };

  @ApiProperty({
    description: 'A data de criação da configuração.',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'A data de atualização da configuração.',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
