import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { FlashSale } from './FlashSale';

@Entity('flash_sale_requests')
export class FlashSaleRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ name: 'flash_sale_id', type: 'uuid' })
  flashSaleId: string;

  @Column({ name: 'request_status', type: 'boolean', default: false })
  requestStatus: boolean;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ type: 'varchar' })
  language: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => FlashSale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flash_sale_id' })
  flashSale: FlashSale;
}
