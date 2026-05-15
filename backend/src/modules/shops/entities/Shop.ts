import { User } from '@/modules/auth/entities/User';
import { Category } from '@/modules/catalogs/entities/Category';
import { OwnershipTransfer } from '@/modules/ownerships/entities/OwnershipTransfer';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Balance } from './Balance';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id', type: 'uuid' })
  ownerId: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'varchar', nullable: true })
  slug: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'cover_image', type: 'json', nullable: true })
  coverImage: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  logo: Record<string, unknown> | null;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  address: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  settings: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  notifications: Record<string, unknown> | null;

  productsCount: number;
  ordersCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'category_shop',
    joinColumn: { name: 'shop_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @OneToMany(() => OwnershipTransfer, (transfer) => transfer.shop)
  ownerShipTransfers: OwnershipTransfer[];

  @OneToOne(() => Balance, (balance) => balance.shop)
  balance: Balance | null;
}
