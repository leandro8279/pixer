import { Injectable } from '@nestjs/common';

import { IListShopsFormatter } from './IListShops.formatter';

@Injectable()
export class ListShopsFormatter implements IListShopsFormatter {
  public format(params: IListShopsFormatter.Params): IListShopsFormatter.Result {
    return {
      current_page: params.currentPage,
      data: params.shops.map((shop) => ({
        id: shop.id,
        name: shop.name,
        slug: shop.slug,
        description: shop.description,
        logo: shop.logo,
        cover_image: shop.coverImage,
        is_active: shop.isActive,
        settings: shop.settings,
        address: shop.address,
        notifications: shop.notifications,
        created_at: shop.createdAt,
        updated_at: shop.updatedAt,
      })),
      per_page: params.perPage,
      last_page: params.lastPage,
      total: params.total,
    };
  }
}
