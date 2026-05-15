import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Order } from './Order';

@Entity('order_wallet_points')
export class OrderWalletPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  amount: number | null;

  @Column({ name: 'order_id', type: 'uuid', nullable: true, unique: true })
  orderId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Order, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order | null;
}
