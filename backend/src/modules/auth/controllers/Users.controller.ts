import { UserResponseDTO } from '@/modules/auth/dto';
import { IMeService, ME_SERVICE } from '@/modules/auth/services';
import { Controller, Get, HttpCode, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(
    @Inject(ME_SERVICE)
    private readonly meService: IMeService,
  ) {}
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Dados do usuário autenticado',
    description:
      'Retorna o perfil completo do usuário logado, incluindo permissões, carteira de pontos, ' +
      'endereços, lojas próprias e loja gerenciada (se for staff). ' +
      'Requer o cabeçalho `Authorization: Bearer <token>`.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso',
    type: UserResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Não autenticado — token ausente ou inválido' })
  me(@CurrentUser() user: AuthenticatedUser): Promise<IMeService.Result> {
    return this.meService.execute(user.id);
  }
}
