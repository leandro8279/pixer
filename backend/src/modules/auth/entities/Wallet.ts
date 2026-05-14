import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total_points', type: 'float', default: 0 })
  totalPoints: number;

  @Column({ name: 'points_used', type: 'float', default: 0 })
  pointsUsed: number;

  @Column({ name: 'available_points', type: 'float', default: 0 })
  availablePoints: number;

  @Column({ name: 'customer_id', type: 'uuid', unique: true, nullable: true })
  customerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // @OneToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'customer_id' })
  // customer: User | null;
}
