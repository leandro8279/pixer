import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Product } from '@/modules/product/entities/Product';
import { Resource } from './Resource';

@Entity('pickup_location_product')
export class PickupLocationProduct {
  @PrimaryColumn({ name: 'resource_id', type: 'uuid' })
  resourceId: string;

  @PrimaryColumn({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => Resource, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
