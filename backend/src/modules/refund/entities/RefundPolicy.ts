import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { RefundPolicyStatus, RefundPolicyTarget } from '@/shared/enums';
import { Shop } from '@/modules/shop/entities/Shop';

@Entity('refund_policies')
export class RefundPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: RefundPolicyTarget, default: RefundPolicyTarget.VENDOR })
  target: RefundPolicyTarget;

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'enum', enum: RefundPolicyStatus, default: RefundPolicyStatus.PENDING })
  status: RefundPolicyStatus;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;
}
