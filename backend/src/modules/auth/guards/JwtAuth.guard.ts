import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createHash } from 'crypto';
import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository/IAuth.repository';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await (super.canActivate(context) as Promise<boolean>);
    if (!result) return false;

    const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.replace(/^Bearer\s+/i, '').trim();

    if (token) {
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const isRevoked = await this.authRepository.isTokenRevoked(tokenHash);
      if (isRevoked) throw new UnauthorizedException('Token revogado');
    }

    return true;
  }
}
