import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Permission } from './Permission';

@Entity('model_has_permissions')
export class ModelHasPermission {
  @PrimaryColumn({ name: 'permission_id' })
  permissionId: string;

  @PrimaryColumn({ name: 'model_type' })
  modelType: string;

  @PrimaryColumn({ name: 'model_id' })
  modelId: string;

  @ManyToOne(() => Permission, (permission) => permission.modelPermissions)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
