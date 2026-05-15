import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { DefaultStatusType } from '@/shared/enums';
import { User } from '@/modules/auth/entities/User';
import { Shop } from '@/modules/shops/entities/Shop';

@Entity('ownership_transfers')
@Index(['id', 'transactionIdentifier', 'createdAt'])
export class OwnershipTransfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'transaction_identifier', type: 'varchar', length: 50 })
  transactionIdentifier: string;

  @Column({ name: 'from', type: 'uuid' })
  from: string;

  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @Column({ name: 'to', type: 'uuid' })
  to: string;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ type: 'enum', enum: DefaultStatusType, default: DefaultStatusType.PENDING })
  status: DefaultStatusType;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from' })
  fromUser: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to' })
  toUser: User;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by' })
  creator: User;
}
