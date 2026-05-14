import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ModelHasRole } from './ModelHasRole';

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
}
