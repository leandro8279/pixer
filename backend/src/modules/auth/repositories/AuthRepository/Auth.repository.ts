import { ModelHasPermission } from '@/modules/auth/entities/ModelHasPermission';
import { ModelHasRole } from '@/modules/auth/entities/ModelHasRole';
import { Permission } from '@/modules/auth/entities/Permission';
import { Role } from '@/modules/auth/entities/Role';
import { RevokedToken } from '@/modules/auth/entities/RevokedToken';
import { User } from '@/modules/auth/entities/User';
import { Wallet } from '@/modules/auth/entities/Wallet';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserData, IAuthRepository, UserWithRelations } from './IAuth.repository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(ModelHasPermission)
    private readonly modelHasPermissionRepository: Repository<ModelHasPermission>,

    @InjectRepository(ModelHasRole)
    private readonly modelHasRoleRepository: Repository<ModelHasRole>,

    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findActiveUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email, isActive: true } });
  }

  async getUserPermissions(id: string): Promise<string[]> {
    const records = await this.modelHasPermissionRepository.find({
      where: { modelId: id, modelType: 'App\\Models\\User' },
      relations: { permission: true },
    });

    return records.map((r) => r.permission.name);
  }

  async getUserRole(id: string): Promise<string | null> {
    const record = await this.modelHasRoleRepository.findOne({
      where: { modelId: id, modelType: 'App\\Models\\User' },
      relations: { role: true },
    });
    return record?.role.name ?? null;
  }

  async assignPermissionToUser(userId: string, permissionName: string): Promise<void> {
    let permission = await this.permissionRepository.findOne({ where: { name: permissionName } });

    if (!permission) {
      permission = await this.permissionRepository.save(
        this.permissionRepository.create({ name: permissionName, guardName: 'api' }),
      );
    }
    const existing = await this.modelHasPermissionRepository.findOne({
      where: { permissionId: permission.id, modelId: userId, modelType: 'App\\Models\\User' },
    });

    if (!existing) {
      await this.modelHasPermissionRepository.save(
        this.modelHasPermissionRepository.create({
          modelId: userId,
          permissionId: permission.id,
          modelType: 'App\\Models\\User',
        }),
      );
    }
  }

  async assignRoleToUser(userId: string, roleName: string): Promise<void> {
    let role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) {
      role = await this.roleRepository.save(this.roleRepository.create({ name: roleName, guardName: 'api' }));
    }
    const existing = await this.modelHasRoleRepository.findOne({
      where: { roleId: role.id, modelId: userId, modelType: 'App\\Models\\User' },
    });
    if (!existing) {
      await this.modelHasRoleRepository.save(
        this.modelHasRoleRepository.create({
          roleId: role.id,
          modelId: userId,
          modelType: 'App\\Models\\User',
        }),
      );
    }
  }

  async createUser(params: CreateUserData): Promise<User> {
    return this.userRepository.save(this.userRepository.create(params));
  }

  async createWallet(userId: string): Promise<void> {
    const existing = await this.walletRepository.findOne({ where: { customerId: userId } });
    if (!existing) {
      await this.walletRepository.save(
        this.walletRepository.create({
          pointsUsed: 0,
          totalPoints: 0,
          customerId: userId,
          availablePoints: 0,
        }),
      );
    }
  }

  async findUserWithRelationsById(id: string): Promise<UserWithRelations | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { modelHasRoles: { role: true } },
    });
    if (!user) return null;

    const wallet = await this.walletRepository.findOne({ where: { customerId: id } });
    const roles = user.modelHasRoles.map((mhr) => mhr.role);

    return Object.assign(user, { wallet: wallet ?? null, roles });
  }

  async revokeToken(tokenHash: string, expiresAt: Date): Promise<void> {
    const existing = await this.revokedTokenRepository.findOne({ where: { tokenHash } });
    if (!existing) {
      await this.revokedTokenRepository.save(
        this.revokedTokenRepository.create({ tokenHash, expiresAt }),
      );
    }
  }

  async isTokenRevoked(tokenHash: string): Promise<boolean> {
    const record = await this.revokedTokenRepository.findOne({ where: { tokenHash } });
    if (!record) return false;
    if (record.expiresAt < new Date()) {
      await this.revokedTokenRepository.delete({ tokenHash });
      return false;
    }
    return true;
  }
}
