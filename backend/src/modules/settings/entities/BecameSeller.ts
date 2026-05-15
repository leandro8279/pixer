import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('became_sellers')
export class BecameSeller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'page_options', type: 'json' })
  pageOptions: Record<string, unknown>;

  @Column({ type: 'varchar', unique: true })
  language: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
