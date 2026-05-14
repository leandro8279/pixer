import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    description: 'Endereço de e-mail cadastrado',
    example: 'usuario@exemplo.com',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'minhasenha123' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string válida' })
  password: string;
}
