import { Permission } from '@/modules/auth/enums/Permission.enum';
import { Shop } from '@/modules/shops/entities/Shop';
import { IShopsRepository, SHOP_REPOSITORY } from '@/modules/shops/repositories/ShopsRepository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IGetShopService } from './IGetShop.service';

@Injectable()
export class GetShopService implements IGetShopService {
  constructor(
    @Inject(SHOP_REPOSITORY)
    private readonly shopsRepository: IShopsRepository,
  ) {}

  private getIsOwner(idOrSlug: string, requestingUserShopIds: string[]) {
    return (
      requestingUserShopIds?.some((sid) => {
        const needle = /^\d+$/.test(String(idOrSlug)) ? idOrSlug : null;
        return needle ? sid === needle : false;
      }) ?? false
    );
  }

  public async execute(params: IGetShopService.Params): Promise<IGetShopService.Result> {
    const { idOrSlug, language, requestingUserId, requestingUserPermissions, requestingUserShopIds } = params;

    const isSuperAdmin = requestingUserPermissions?.includes(Permission.SUPER_ADMIN) ?? false;

    const isOwner = this.getIsOwner(idOrSlug, requestingUserShopIds);

    const includeBalance = !!(requestingUserId && (isSuperAdmin || isOwner));

    const shop = await this.shopsRepository.findShopByIdOrSlug(idOrSlug, language, includeBalance);

    if (!shop) {
      throw new NotFoundException('Loja não encontrada');
    }

    return this.toEntity(shop);
  }

  private toEntity(shop: Shop): IGetShopService.Result {
    let balance = null;

    if (shop.balance) {
      balance = {
        id: shop.balance.id,
        current_balance: shop.balance.currentBalance,
        admin_commission_rate: shop.balance.adminCommissionRate,
        total_earnings: shop.balance.totalEarnings,
        withdrawn_amount: shop.balance.withdrawnAmount,
        payment_info: shop.balance.paymentInfo,
      };
    }

    return {
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      balance: balance,
      description: shop.description,
      cover_image: shop.coverImage,
      logo: shop.logo,
      is_active: shop.isActive,
      address: shop.address,
      settings: shop.settings,
      created_at: shop.createdAt,
      updated_at: shop.updatedAt,
    };
  }
}
