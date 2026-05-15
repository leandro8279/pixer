import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'model_type', type: 'varchar', nullable: true })
  modelType: string | null;

  @Column({ name: 'model_id', type: 'uuid', nullable: true })
  modelId: string | null;

  @Column({ type: 'varchar', nullable: true })
  uuid: string | null;

  @Column({ name: 'collection_name', type: 'varchar' })
  collectionName: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'file_name', type: 'varchar' })
  fileName: string;

  @Column({ name: 'mime_type', type: 'varchar', nullable: true })
  mimeType: string | null;

  @Column({ type: 'varchar' })
  disk: string;

  @Column({ name: 'conversions_disk', type: 'varchar', nullable: true })
  conversionsDisk: string | null;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'json' })
  manipulations: Record<string, unknown>;

  @Column({ name: 'custom_properties', type: 'json' })
  customProperties: Record<string, unknown>;

  @Column({ name: 'generated_conversions', type: 'json' })
  generatedConversions: Record<string, unknown>;

  @Column({ name: 'responsive_images', type: 'json' })
  responsiveImages: Record<string, unknown>;

  @Column({ name: 'order_column', type: 'int', nullable: true })
  orderColumn: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
