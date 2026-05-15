import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { FlashSaleType } from '@/shared/enums';

@Entity('flash_sales')
export class FlashSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'start_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'sale_status', type: 'boolean', default: false })
  saleStatus: boolean;

  @Column({ type: 'enum', enum: FlashSaleType, default: FlashSaleType.DEFAULT })
  type: FlashSaleType;

  @Column({ type: 'int', nullable: true })
  rate: number | null;

  @Column({ name: 'sale_builder', type: 'json', nullable: true })
  saleBuilder: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ name: 'cover_image', type: 'json', nullable: true })
  coverImage: Record<string, unknown> | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
