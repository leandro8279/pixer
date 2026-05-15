import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { StoreNotice } from './StoreNotice';

@Entity('store_notice_user')
export class StoreNoticeUser {
  @PrimaryColumn({ name: 'store_notice_id', type: 'uuid' })
  storeNoticeId: string;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => StoreNotice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_notice_id' })
  storeNotice: StoreNotice;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
