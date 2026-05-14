import { Permission } from '@/modules/auth/enums/Permission.enum';
import { Role } from '@/modules/auth/enums/Role.enum';
import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository';
import { ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { IRegisterService } from './IRegister.service';

@Injectable()
export class RegisterService implements IRegisterService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  public async execute(params: IRegisterService.Params): Promise<IRegisterService.Result> {
    if (params.permission === Permission.SUPER_ADMIN) {
      throw new ForbiddenException('Não é permitido cadastrar com esta permissão');
    }

    const existing = await this.authRepository.findUserByEmail(params.email.toLowerCase());
    if (existing) {
      throw new ConflictException('Este e-mail já está em uso');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = await this.authRepository.createUser({
      name: params.name,
      password: hashedPassword,
      email: params.email.toLowerCase(),
    });

    const permissions: string[] = [Permission.CUSTOMER];
    let role: string = Role.CUSTOMER;

    if (params.permission && params.permission !== Permission.CUSTOMER) {
      permissions.push(params.permission);
      role = Role.STORE_OWNER;
    }

    for (const perm of permissions) {
      await this.authRepository.assignPermissionToUser(user.id, perm);
    }
    await this.authRepository.assignRoleToUser(user.id, role);
    await this.authRepository.createWallet(user.id);

    const token = this.jwtService.sign({ sub: user.id.toString(), email: user.email });

    return { token, permissions, role };
  }
}
