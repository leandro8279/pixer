import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Product } from '@/modules/product/entities/Product';
import { FlashSaleRequest } from './FlashSaleRequest';

@Entity('flash_sale_requests_products')
export class FlashSaleRequestProduct {
  @PrimaryColumn({ name: 'flash_sale_requests_id', type: 'uuid' })
  flashSaleRequestsId: string;

  @PrimaryColumn({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => FlashSaleRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flash_sale_requests_id' })
  flashSaleRequest: FlashSaleRequest;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
