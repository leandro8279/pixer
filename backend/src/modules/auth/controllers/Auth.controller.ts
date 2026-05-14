import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from '@/modules/auth/dto';
import { ILoginService, IRegisterService, LOGIN_SERVICE, REGISTER_SERVICE } from '@/modules/auth/services';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_SERVICE)
    private readonly loginService: ILoginService,

    @Inject(REGISTER_SERVICE)
    private readonly registerService: IRegisterService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar novo usuário',
    description:
      'Cria uma nova conta de usuário. Um e-mail de verificação é enviado automaticamente. ' +
      'O token retornado já pode ser usado, mas algumas rotas exigem e-mail verificado.',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: RegisterResponseDTO })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos (ex: e-mail já cadastrado ou campos obrigatórios ausentes)',
  })
  register(@Body() dto: RegisterRequestDTO): Promise<IRegisterService.Result> {
    return this.registerService.execute(dto);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login com e-mail e senha',
    description:
      'Autentica o usuário e retorna um token JWT. ' +
      'Se `email_verified` for `false`, o token é nulo e o e-mail precisa ser verificado antes de prosseguir.',
  })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: LoginResponseDTO })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 403, description: 'Conta desativada' })
  token(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.loginService.execute(dto);
  }
}
