import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { PaymentGateway } from './PaymentGateway';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'method_key', type: 'varchar', unique: true })
  methodKey: string;

  @Column({ name: 'payment_gateway_id', type: 'uuid', nullable: true })
  paymentGatewayId: string | null;

  @Column({ name: 'default_card', type: 'boolean', nullable: true, default: false })
  defaultCard: boolean | null;

  @Column({ type: 'varchar', unique: true })
  fingerprint: string;

  @Column({ name: 'owner_name', type: 'varchar', nullable: true })
  ownerName: string | null;

  @Column({ type: 'varchar', nullable: true })
  network: string | null;

  @Column({ type: 'varchar', nullable: true })
  type: string | null;

  @Column({ type: 'varchar', nullable: true })
  last4: string | null;

  @Column({ type: 'varchar', nullable: true })
  expires: string | null;

  @Column({ type: 'varchar', nullable: true })
  origin: string | null;

  @Column({ name: 'verification_check', type: 'varchar', nullable: true })
  verificationCheck: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PaymentGateway, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'payment_gateway_id' })
  paymentGateway: PaymentGateway | null;
}
