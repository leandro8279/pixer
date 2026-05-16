import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  url: string | null;

  @Column({ name: 'file_name', type: 'varchar', nullable: true })
  fileName: string | null;

  @Column({ name: 'original', type: 'varchar', nullable: true })
  original: string | null;

  @Column({ type: 'varchar', nullable: true })
  thumbnail: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
