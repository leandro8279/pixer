import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Order } from '@/modules/order/entities/Order';
import { Product } from '@/modules/product/entities/Product';

@Entity('availabilities')
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  from: string;

  @Column({ type: 'varchar' })
  to: string;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @Column({ name: 'booking_duration', type: 'varchar' })
  bookingDuration: string;

  @Column({ name: 'order_quantity', type: 'int' })
  orderQuantity: number;

  @Column({ name: 'bookable_type', type: 'varchar' })
  bookableType: string;

  @Column({ name: 'bookable_id', type: 'uuid' })
  bookableId: string;

  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  orderId: string | null;

  @Column({ name: 'product_id', type: 'uuid', nullable: true })
  productId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Order, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order | null;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product | null;
}
