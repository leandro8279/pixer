import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { AttributeValue } from './AttributeValue';

@Entity('attribute_product')
export class AttributeProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'attribute_value_id', type: 'uuid' })
  attributeValueId: string;

  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => AttributeValue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attribute_value_id' })
  attributeValue: AttributeValue;
}
