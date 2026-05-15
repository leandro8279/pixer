import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Type } from '@/modules/catalog/entities/Type';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'is_approved', type: 'boolean', default: false })
  isApproved: boolean;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ name: 'cover_image', type: 'json', nullable: true })
  coverImage: Record<string, unknown> | null;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ name: 'type_id', type: 'uuid' })
  typeId: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  website: string | null;

  @Column({ type: 'json', nullable: true })
  socials: Record<string, unknown> | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Type, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
