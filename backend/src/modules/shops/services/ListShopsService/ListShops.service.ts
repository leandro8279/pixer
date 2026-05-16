import { LIST_SHOP_FORMATTER, IListShopsFormatter } from '@/modules/shops/formatters';
import { IShopsRepository, SHOP_REPOSITORY } from '@/modules/shops/repositories/ShopsRepository';
import { Inject, Injectable } from '@nestjs/common';

import { IListShopsService } from './IListShops.service';

@Injectable()
export class ListShopsService implements IListShopsService {
  constructor(
    @Inject(SHOP_REPOSITORY)
    private readonly shopsRepository: IShopsRepository,
    @Inject(LIST_SHOP_FORMATTER)
    private readonly formatter: IListShopsFormatter,
  ) {}

  public async execute(params: IListShopsService.Params): Promise<IListShopsService.Result> {
    const result = await this.shopsRepository.listShops({
      page:       params.page,
      limit:      params.limit,
      language:   params.language,
      search:     params.search,
      searchJoin: params.searchJoin,
      isActive:   params.isActive,
    });

    return this.formatter.format({
      shops:       result.data,
      total:       result.total,
      perPage:     result.perPage,
      currentPage: result.currentPage,
      lastPage:    result.lastPage,
    });
  }
}
