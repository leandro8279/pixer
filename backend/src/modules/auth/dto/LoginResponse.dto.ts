import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'Token JWT de acesso. Nulo se o e-mail não foi verificado',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    nullable: true,
  })
  token: string | null;

  @ApiProperty({
    description: 'Lista de permissões do usuário',
    type: [String],
    example: ['customer'],
  })
  permissions: string[];

  @ApiProperty({
    description: 'Indica se o e-mail do usuário foi verificado',
    example: true,
  })
  email_verified: boolean;

  @ApiProperty({
    description: 'Papel principal do usuário',
    example: 'customer',
    nullable: true,
  })
  role: string | null;
}
