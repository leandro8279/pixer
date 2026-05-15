import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { DigitalFile } from './DigitalFile';

@Entity('download_tokens')
export class DownloadToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'boolean', default: false })
  downloaded: boolean;

  @Column({ name: 'digital_file_id', type: 'uuid', nullable: true })
  digitalFileId: string | null;

  @Column({ type: 'text', nullable: true })
  payload: string | null;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => DigitalFile, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'digital_file_id' })
  digitalFile: DigitalFile | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;
}
