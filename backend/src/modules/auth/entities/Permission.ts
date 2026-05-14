import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { ModelHasPermission } from './ModelHasPermission';
import { RoleHasPermission } from './RoleHasPermission';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'guard_name', type: 'varchar', length: 255 })
  guardName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ModelHasPermission, (modelHasPermission) => modelHasPermission.permission)
  modelPermissions: ModelHasPermission[];

  @OneToMany(() => RoleHasPermission, (roleHasPermission) => roleHasPermission.permission)
  rolePermissions: RoleHasPermission[];
}
