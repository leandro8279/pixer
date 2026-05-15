import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Shop } from './Shop';

@Entity('balances')
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'shop_id', type: 'uuid', unique: true })
  shopId: string;

  @Column({ name: 'admin_commission_rate', type: 'float', nullable: true })
  adminCommissionRate: number | null;

  @Column({ name: 'total_earnings', type: 'float', default: 0 })
  totalEarnings: number;

  @Column({ name: 'withdrawn_amount', type: 'float', default: 0 })
  withdrawnAmount: number;

  @Column({ name: 'current_balance', type: 'float', default: 0 })
  currentBalance: number;

  @Column({ name: 'is_custom_commission', type: 'boolean', default: false })
  isCustomCommission: boolean;

  @Column({ name: 'payment_info', type: 'json', nullable: true })
  paymentInfo: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}
