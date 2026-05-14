import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

import { ModelHasRole } from './ModelHasRole';
import { RoleHasPermission } from './RoleHasPermission';

@Entity('roles')
export class Role {
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

  @OneToMany(() => ModelHasRole, (modelHasRole) => modelHasRole.role)
  modelHasRoles: ModelHasRole[];

  @OneToMany(() => RoleHasPermission, (roleHasPermission) => roleHasPermission.role)
  roleHasPermissions: RoleHasPermission[];
}
