import { IShopsRepository, SHOP_REPOSITORY } from '@/modules/shops/repositories/ShopsRepository';
import { Inject, Injectable } from '@nestjs/common';

import { IListShopsService } from './IListShops.service';

@Injectable()
export class ListShopsService implements IListShopsService {
  constructor(
    @Inject(SHOP_REPOSITORY)
    private readonly shopsRepository: IShopsRepository,
  ) {}

  public async execute(params: IListShopsService.Params): Promise<IListShopsService.Result> {
    return this.shopsRepository.listShops({
      page: params.page,
      limit: params.limit,
      language: params.language,
      search: params.search,
      searchJoin: params.searchJoin,
      isActive: params.isActive,
    });
  }
}
