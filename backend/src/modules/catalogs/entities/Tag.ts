import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Type } from './Type';

@Entity('tags')
export class Tag {
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

  @ManyToOne(() => Type, { nullable: true })
  @JoinColumn({ name: 'type_id' })
  type: Type | null;
}
