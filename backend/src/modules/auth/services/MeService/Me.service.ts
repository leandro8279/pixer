import { USER_FORMATTER, IUserFormatter } from '@/modules/auth/formatters';
import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IMeService } from './IMe.service';

@Injectable()
export class MeService implements IMeService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(USER_FORMATTER)
    private readonly userFormatter: IUserFormatter,
  ) {}

  public async execute(id: IMeService.Params): Promise<IMeService.Result> {
    const user = await this.authRepository.findUserWithRelationsById(id);
    if (!user) throw new UnauthorizedException('Não autorizado');

    const [permissions, role] = await Promise.all([
      this.authRepository.getUserPermissions(id),
      this.authRepository.getUserRole(id),
    ]);

    return this.userFormatter.format({ user, permissions, role });
  }
}
