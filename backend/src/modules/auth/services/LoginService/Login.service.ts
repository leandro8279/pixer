import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { ILoginService } from './ILogin.service';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  public async execute(params: ILoginService.Params): Promise<ILoginService.Result> {
    const user = await this.authRepository.findActiveUserByEmail(params.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const [permissions, role] = await Promise.all([
      this.authRepository.getUserPermissions(user.id),
      this.authRepository.getUserRole(user.id),
    ]);

    const email_verified = user.email_verified_at !== null;
    const token = this.jwtService.sign({ sub: user.id.toString(), email: user.email });

    return { token, permissions, email_verified, role };
  }
}
