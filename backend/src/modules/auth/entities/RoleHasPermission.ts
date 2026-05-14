import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Permission } from './Permission';
import { Role } from './Role';

@Entity('role_has_permissions')
export class RoleHasPermission {
  @PrimaryColumn({ name: 'permission_id', type: 'uuid' })
  permissionId: string;

  @PrimaryColumn({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.roleHasPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
