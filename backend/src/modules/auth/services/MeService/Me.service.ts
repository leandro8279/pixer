import { User } from '@/modules/auth/entities/User';
import { AUTH_REPOSITORY, IAuthRepository } from '@/modules/auth/repositories/AuthRepository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IMeService } from './IMe.service';

@Injectable()
export class MeService implements IMeService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  public async execute(id: IMeService.Params): Promise<IMeService.Result> {
    const user = await this.authRepository.findUserWithRelationsById(id);
    if (!user) throw new UnauthorizedException('Não autorizado');

    const [permissions, role] = await Promise.all([
      this.authRepository.getUserPermissions(id),
      this.authRepository.getUserRole(id),
    ]);

    return this.toEntity(user, permissions, role);
  }

  private toEntity(user: User, permissions: string[], role: string) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      email_verified_at: user.email_verified_at,
      is_active: user.isActive,
      shop_id: user.shopId,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      profile: user.profile
        ? {
            id: user.profile.id,
            bio: user.profile.bio,
            avatar: user.profile.avatar,
            socials: user.profile.socials,
            contact: user.profile.contact,
          }
        : null,
      wallet: user.wallet
        ? {
            id: user.wallet.id,
            total_points: user.wallet.totalPoints,
            points_used: user.wallet.pointsUsed,
            available_points: user.wallet.availablePoints,
          }
        : null,
      address: user.addresses.map((a) => ({
        id: a.id,
        title: a.title,
        type: a.type,
        default: a.default,
        address: a.address,
      })),
      owned_shops: user.ownedShops.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        is_active: s.isActive,
        balance: s.balance
          ? {
              total_earnings: s.balance.totalEarnings,
              withdrawn_amount: s.balance.withdrawnAmount,
              current_balance: s.balance.currentBalance,
            }
          : null,
      })),
      managed_shop: user.managedShop
        ? {
            id: user.managedShop.id,
            name: user.managedShop.name,
            slug: user.managedShop.slug,
            is_active: user.managedShop.isActive,
            balance: user.managedShop.balance
              ? {
                  total_earnings: user.managedShop.balance.totalEarnings,
                  withdrawn_amount: user.managedShop.balance.withdrawnAmount,
                  current_balance: user.managedShop.balance.currentBalance,
                }
              : null,
          }
        : null,
      last_order: user.orders[0] ?? null,
      permissions,
      role,
    };
  }
}
