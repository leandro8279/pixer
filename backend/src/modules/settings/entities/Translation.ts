import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('translations')
export class Translation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'item_type', type: 'varchar' })
  itemType: string;

  @Column({ name: 'item_id', type: 'uuid' })
  itemId: string;

  @Column({ name: 'translation_item_id', type: 'uuid', nullable: true })
  translationItemId: string | null;

  @Column({ name: 'language_code', type: 'varchar' })
  languageCode: string;

  @Column({ name: 'source_language_code', type: 'varchar' })
  sourceLanguageCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
