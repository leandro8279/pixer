import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  flag: Record<string, unknown>;

  @Column({ name: 'language_code', type: 'varchar' })
  languageCode: string;

  @Column({ name: 'language_name', type: 'varchar' })
  languageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
