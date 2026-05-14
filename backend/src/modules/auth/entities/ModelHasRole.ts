import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Entity('model_has_roles')
export class ModelHasRole {
  @PrimaryColumn({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @PrimaryColumn({ name: 'model_type', type: 'varchar' })
  modelType: string;

  @PrimaryColumn({ name: 'model_id', type: 'uuid' })
  modelId: string;

  @ManyToOne(() => Role, (role) => role.modelHasRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => User, (user) => user.modelHasRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'model_id' })
  user: User;
}
