import { Entity, PrimaryColumn } from 'typeorm';

@Entity('category_shop')
export class CategoryShop {
  @PrimaryColumn({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @PrimaryColumn({ name: 'category_id', type: 'uuid' })
  categoryId: string;
}
