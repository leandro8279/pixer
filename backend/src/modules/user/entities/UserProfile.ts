import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true })
  avatar: Record<string, unknown> | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'json', nullable: true })
  socials: Record<string, unknown> | null;

  @Column({ type: 'varchar', nullable: true })
  contact: string | null;

  @Column({ type: 'json', nullable: true })
  notifications: Record<string, unknown> | null;

  @Column({ name: 'customer_id', type: 'uuid', unique: true })
  customerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;
}
