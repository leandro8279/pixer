import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Product } from '@/modules/product/entities/Product';
import { Variation } from '@/modules/attribute/entities/Variation';
import { Order } from './Order';

@Entity('order_product')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'order_quantity', type: 'varchar' })
  orderQuantity: string;

  @Column({ name: 'unit_price', type: 'float' })
  unitPrice: number;

  @Column({ type: 'float' })
  subtotal: number;

  @Column({ name: 'variation_option_id', type: 'uuid', nullable: true })
  variationOptionId: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Variation, { nullable: true })
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: Variation | null;
}
