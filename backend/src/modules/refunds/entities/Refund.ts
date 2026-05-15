import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { RefundStatus } from '@/shared/enums';
import { User } from '@/modules/auth/entities/User';
import { Shop } from '@/modules/shops/entities/Shop';
import { Order } from '@/modules/orders/entities/Order';
import { RefundReason } from './RefundReason';
import { RefundPolicy } from './RefundPolicy';

@Entity('refunds')
export class Refund {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ type: 'enum', enum: RefundStatus, default: RefundStatus.PENDING })
  status: RefundStatus;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'json', nullable: true })
  images: Record<string, unknown> | null;

  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  orderId: string | null;

  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  customerId: string | null;

  @Column({ name: 'refund_policy_id', type: 'uuid', nullable: true })
  refundPolicyId: string | null;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @Column({ name: 'refund_reason_id', type: 'uuid', nullable: true })
  refundReasonId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Order, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User | null;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;

  @ManyToOne(() => RefundReason, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'refund_reason_id' })
  refundReason: RefundReason | null;

  @ManyToOne(() => RefundPolicy, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'refund_policy_id' })
  refundPolicy: RefundPolicy | null;
}
