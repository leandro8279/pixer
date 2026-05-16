import { ShopsController } from '@/modules/shops/controllers/Shops.controller';
import { Shop } from '@/modules/shops/entities/Shop';
import { LIST_SHOP_FORMATTER, ListShopsFormatter } from '@/modules/shops/formatters';
import { SHOP_REPOSITORY, ShopsRepository } from '@/modules/shops/repositories';
import {
  GET_SHOP_SERVICE, GetShopService,
  LIST_SHOP_SERVICE, ListShopsService,
} from '@/modules/shops/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [ShopsController],
  providers: [
    { provide: SHOP_REPOSITORY,    useClass: ShopsRepository    },
    { provide: LIST_SHOP_FORMATTER, useClass: ListShopsFormatter },
    { provide: GET_SHOP_SERVICE,   useClass: GetShopService     },
    { provide: LIST_SHOP_SERVICE,  useClass: ListShopsService   },
  ],
})
export class ShopsModule {}
