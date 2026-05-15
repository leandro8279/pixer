import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('variation_options')
export class Variation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  price: string;

  @Column({ name: 'sale_price', type: 'varchar', nullable: true })
  salePrice: string | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @Column({ type: 'bigint' })
  quantity: number;

  @Column({ name: 'sold_quantity', type: 'int', default: 0 })
  soldQuantity: number;

  @Column({ name: 'is_disable', type: 'boolean', default: false })
  isDisable: boolean;

  @Column({ type: 'varchar', nullable: true })
  sku: string | null;

  @Column({ type: 'json' })
  options: Record<string, unknown>;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ name: 'is_digital', type: 'boolean', default: false })
  isDigital: boolean;

  @Column({ name: 'digital_file_tracker', type: 'varchar', nullable: true })
  digitalFileTracker: string | null;

  @Column({ name: 'product_id', type: 'uuid', nullable: true })
  productId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
