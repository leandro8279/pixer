import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { StoreNotice } from './StoreNotice';

@Entity('store_notice_read')
export class StoreNoticeRead {
  @PrimaryColumn({ name: 'store_notice_id', type: 'uuid' })
  storeNoticeId: string;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @ManyToOne(() => StoreNotice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_notice_id' })
  storeNotice: StoreNotice;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
