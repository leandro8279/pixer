import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { WithdrawStatus } from '@/shared/enums';
import { Shop } from './Shop';

@Entity('withdraws')
export class Withdraw {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ name: 'payment_method', type: 'varchar', nullable: true })
  paymentMethod: string | null;

  @Column({ type: 'enum', enum: WithdrawStatus, default: WithdrawStatus.PENDING })
  status: WithdrawStatus;

  @Column({ type: 'text', nullable: true })
  details: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}
