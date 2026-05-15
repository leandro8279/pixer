import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { Product } from '@/modules/product/entities/Product';
import { Variation } from '@/modules/attribute/entities/Variation';
import { Order } from '@/modules/order/entities/Order';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @Column({ type: 'float', nullable: true })
  rating: number | null;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'json', nullable: true })
  photos: Record<string, unknown> | null;

  @Column({ name: 'variation_option_id', type: 'uuid', nullable: true })
  variationOptionId: string | null;

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

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Variation, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: Variation | null;
}
