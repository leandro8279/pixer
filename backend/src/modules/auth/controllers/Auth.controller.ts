import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from '@/modules/auth/dto';
import { JwtAuthGuard } from '@/modules/auth/guards/JwtAuth.guard';
import { ILoginService, ILogoutService, IRegisterService, LOGIN_SERVICE, LOGOUT_SERVICE, REGISTER_SERVICE } from '@/modules/auth/services';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_SERVICE)
    private readonly loginService: ILoginService,

    @Inject(REGISTER_SERVICE)
    private readonly registerService: IRegisterService,

    @Inject(LOGOUT_SERVICE)
    private readonly logoutService: ILogoutService,
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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout',
    description: 'Revoga o token JWT atual. Após esta chamada, o token não poderá mais ser utilizado.',
  })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Token inválido ou já revogado' })
  logout(@Req() req: Request): Promise<ILogoutService.Result> {
    const token = (req.headers['authorization'] ?? '').replace(/^Bearer\s+/i, '').trim();
    return this.logoutService.execute({ token });
  }
}
