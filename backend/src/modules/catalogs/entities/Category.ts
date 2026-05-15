import { Shop } from '@/modules/shops/entities/Shop';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Type } from './Type';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string | null;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ type: 'text', nullable: true })
  details: string | null;

  @Column({ name: 'parent', type: 'uuid', nullable: true })
  parentId: string | null;

  @Column({ name: 'type_id', type: 'uuid', nullable: true })
  typeId: string | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent' })
  parentCategory: Category | null;

  @ManyToOne(() => Type, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_id' })
  type: Type | null;

  @ManyToMany(() => Shop)
  shops: Shop[];
}
