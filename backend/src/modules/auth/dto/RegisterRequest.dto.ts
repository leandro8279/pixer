import { Permission } from '@/modules/auth/enums/Permission.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterRequestDTO {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string válida' })
  @MaxLength(255, { message: 'O nome não pode ter mais de 255 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joao@exemplo.com',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'Senha de acesso (mínimo 6 caracteres recomendado)',
    example: 'senhaSegura@123',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string válida' })
  password: string;

  @ApiPropertyOptional({
    description: 'Permissão inicial do usuário. Padrão: customer',
    enum: Permission,
    example: Permission.CUSTOMER,
  })
  @IsOptional()
  @IsEnum(Permission, {
    message: `A permissão deve ser uma das opções: ${Object.values(Permission).join(', ')}`,
  })
  permission?: Permission;
}
