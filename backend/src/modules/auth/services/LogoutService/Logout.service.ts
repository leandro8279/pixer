import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository/IAuth.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';

import { ILogoutService } from './ILogout.service';

@Injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async execute(params: ILogoutService.Params): Promise<ILogoutService.Result> {
    const payload = this.jwtService.decode<{ exp: number }>(params.token);
    if (!payload?.exp) throw new UnauthorizedException('Token inválido');

    const tokenHash = createHash('sha256').update(params.token).digest('hex');
    const expiresAt = new Date(payload.exp * 1000);

    await this.authRepository.revokeToken(tokenHash, expiresAt);

    return { message: 'Logout realizado com sucesso' };
  }
}
