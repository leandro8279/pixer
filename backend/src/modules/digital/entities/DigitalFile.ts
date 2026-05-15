import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Attachment } from '@/modules/products/entities/Attachment';

@Entity('digital_files')
export class DigitalFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'attachment_id', type: 'uuid' })
  attachmentId: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ name: 'file_name', type: 'varchar' })
  fileName: string;

  @Column({ name: 'fileable_type', type: 'varchar' })
  fileableType: string;

  @Column({ name: 'fileable_id', type: 'uuid' })
  fileableId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Attachment)
  @JoinColumn({ name: 'attachment_id' })
  attachment: Attachment;
}
