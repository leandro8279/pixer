import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/auth/entities/User';
import { DigitalFile } from './DigitalFile';

@Entity('ordered_files')
export class OrderedFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'purchase_key', type: 'varchar' })
  purchaseKey: string;

  @Column({ name: 'digital_file_id', type: 'uuid' })
  digitalFileId: string;

  @Column({ name: 'tracking_number', type: 'varchar', nullable: true })
  trackingNumber: string | null;

  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => DigitalFile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'digital_file_id' })
  digitalFile: DigitalFile;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;
}
