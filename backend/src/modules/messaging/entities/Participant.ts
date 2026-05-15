import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { ParticipantType } from '@/shared/enums';
import { User } from '@/modules/auth/entities/User';
import { Shop } from '@/modules/shops/entities/Shop';
import { Conversation } from './Conversation';
import { Message } from './Message';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'conversation_id', type: 'uuid' })
  conversationId: string;

  @Column({ type: 'enum', enum: ParticipantType })
  type: ParticipantType;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @Column({ name: 'message_id', type: 'uuid' })
  messageId: string;

  @Column({ type: 'boolean', default: false })
  notify: boolean;

  @Column({ name: 'last_read', type: 'timestamp', nullable: true })
  lastRead: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToOne(() => Message, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: Message;
}
