import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('payment_intents')
export class PaymentIntent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tracking_number', type: 'varchar', nullable: true })
  trackingNumber: string | null;

  @Column({ name: 'payment_gateway', type: 'varchar', nullable: true })
  paymentGateway: string | null;

  @Column({ type: 'varchar', nullable: true })
  currency: string | null;

  @Column({ name: 'intent_id', type: 'varchar', nullable: true })
  intentId: string | null;

  @Column({ name: 'intent_secret', type: 'varchar', nullable: true })
  intentSecret: string | null;

  @Column({ name: 'is_redirect', type: 'boolean', default: false })
  isRedirect: boolean;

  @Column({ name: 'payment_id', type: 'varchar', nullable: true })
  paymentId: string | null;

  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  orderId: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
