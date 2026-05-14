import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDTO {
  @ApiProperty({
    description: 'Token JWT de acesso gerado após o registro',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'Lista de permissões atribuídas ao novo usuário',
    type: [String],
    example: ['customer'],
  })
  permissions: string[];

  @ApiProperty({
    description: 'Papel atribuído ao novo usuário',
    example: 'customer',
  })
  role: string;
}
