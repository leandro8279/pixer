import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Product } from '@/modules/product/entities/Product';
import { FlashSale } from './FlashSale';

@Entity('flash_sale_products')
export class FlashSaleProduct {
  @PrimaryColumn({ name: 'flash_sale_id', type: 'uuid' })
  flashSaleId: string;

  @PrimaryColumn({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => FlashSale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flash_sale_id' })
  flashSale: FlashSale;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
