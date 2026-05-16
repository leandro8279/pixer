import { Order } from '@/modules/orders/entities/Order';
import { Shop } from '@/modules/shops/entities/Shop';
import { Address } from '@/modules/users/entities/Address';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ModelHasRole } from './ModelHasRole';
import { UserProfile } from './UserProfile';
import { Wallet } from './Wallet';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  email_verified_at?: Date;

  @Column()
  password: string;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true, name: 'shop_id' })
  shopId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ModelHasRole, (modelHasRole) => modelHasRole.user)
  modelHasRoles: ModelHasRole[];

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile | null;

  @OneToOne(() => Wallet, (wallet) => wallet.customer)
  wallet: Wallet | null;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @OneToMany(() => Shop, (shop) => shop.owner)
  ownedShops: Shop[];

  @OneToOne(() => Shop, (shop) => shop.manager, { nullable: true })
  @JoinColumn({ name: 'managed_shop_id' })
  managedShop: Shop | null;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
