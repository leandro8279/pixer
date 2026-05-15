import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { CouponType } from '@/shared/enums';
import { Shop } from '@/modules/shop/entities/Shop';
import { User } from '@/modules/auth/entities/User';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar', nullable: true, default: 'en' })
  language: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ type: 'enum', enum: CouponType, default: CouponType.DEFAULT_COUPON })
  type: CouponType;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ name: 'minimum_cart_amount', type: 'float', default: 0 })
  minimumCartAmount: number;

  @Column({ name: 'active_from', type: 'varchar' })
  activeFrom: string;

  @Column({ name: 'expire_at', type: 'varchar' })
  expireAt: string;

  @Column({ type: 'boolean', default: false })
  target: boolean;

  @Column({ name: 'is_approve', type: 'boolean', default: false })
  isApprove: boolean;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User | null;
}
