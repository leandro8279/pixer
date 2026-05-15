import { ShopsController } from '@/modules/shops/controllers/Shops.controller';
import { Shop } from '@/modules/shops/entities/Shop';
import { SHOP_REPOSITORY, ShopsRepository } from '@/modules/shops/repositories';
import { GET_SHOP_SERVICE, GetShopService } from '@/modules/shops/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [ShopsController],
  providers: [
    {
      provide: SHOP_REPOSITORY,
      useClass: ShopsRepository,
    },
    {
      provide: GET_SHOP_SERVICE,
      useClass: GetShopService,
    },
  ],
})
export class ShopsModule {}
