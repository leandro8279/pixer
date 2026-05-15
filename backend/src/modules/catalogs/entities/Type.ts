import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string | null;

  @Column({ name: 'promotional_sliders', type: 'json', nullable: true })
  promotionalSliders: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  settings: Record<string, unknown> | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
