import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ShippingType } from '@/shared/enums';

@Entity('shipping_classes')
export class ShippingClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ name: 'is_global', type: 'varchar', default: 'true' })
  isGlobal: string;

  @Column({ type: 'enum', enum: ShippingType, default: ShippingType.FIXED })
  type: ShippingType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
