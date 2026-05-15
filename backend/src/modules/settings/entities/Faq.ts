import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { Shop } from '@/modules/shops/entities/Shop';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @Column({ name: 'faq_title', type: 'varchar' })
  faqTitle: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ name: 'faq_description', type: 'text' })
  faqDescription: string;

  @Column({ name: 'faq_type', type: 'varchar', nullable: true })
  faqType: string | null;

  @Column({ name: 'issued_by', type: 'varchar', nullable: true })
  issuedBy: string | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;
}
