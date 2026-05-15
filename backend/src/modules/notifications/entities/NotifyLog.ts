import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';

@Entity('notify_logs')
export class NotifyLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  receiver: string;

  @Column({ type: 'uuid', nullable: true })
  sender: string | null;

  @Column({ name: 'notify_type', type: 'varchar', nullable: true })
  notifyType: string | null;

  @Column({ name: 'notify_receiver_type', type: 'varchar', nullable: true })
  notifyReceiverType: string | null;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @Column({ name: 'notify_tracker', type: 'varchar', nullable: true })
  notifyTracker: string | null;

  @Column({ name: 'notify_text', type: 'text', nullable: true })
  notifyText: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver' })
  receiverUser: User;

  @ManyToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender' })
  senderUser: User | null;
}
