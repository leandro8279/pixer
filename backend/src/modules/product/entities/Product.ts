import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { ProductStatus, ProductType, ProductVisibilityStatus } from '@/shared/enums';
import { Type } from '@/modules/catalog/entities/Type';
import { Shop } from '@/modules/shop/entities/Shop';
import { Author } from './Author';
import { Manufacturer } from './Manufacturer';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'type_id', type: 'uuid' })
  typeId: string;

  @Column({ type: 'float', nullable: true })
  price: number | null;

  @Column({ name: 'sale_price', type: 'float', nullable: true })
  salePrice: number | null;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @Column({ name: 'min_price', type: 'float', nullable: true })
  minPrice: number | null;

  @Column({ name: 'max_price', type: 'float', nullable: true })
  maxPrice: number | null;

  @Column({ type: 'varchar', nullable: true })
  sku: string | null;

  @Column({ name: 'preview_url', type: 'varchar', nullable: true })
  previewUrl: string | null;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ name: 'in_stock', type: 'boolean', default: true })
  inStock: boolean;

  @Column({ name: 'is_taxable', type: 'boolean', default: false })
  isTaxable: boolean;

  @Column({ name: 'shipping_class_id', type: 'uuid', nullable: true })
  shippingClassId: string | null;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @Column({ type: 'enum', enum: ProductVisibilityStatus, default: ProductVisibilityStatus.VISIBILITY_PUBLIC })
  visibility: ProductVisibilityStatus;

  @Column({ name: 'product_type', type: 'enum', enum: ProductType, default: ProductType.SIMPLE })
  productType: ProductType;

  @Column({ type: 'varchar' })
  unit: string;

  @Column({ type: 'varchar', nullable: true })
  height: string | null;

  @Column({ type: 'varchar', nullable: true })
  width: string | null;

  @Column({ type: 'varchar', nullable: true })
  length: string | null;

  @Column({ type: 'json', nullable: true })
  image: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  gallery: Record<string, unknown> | null;

  @Column({ type: 'json', nullable: true })
  video: Record<string, unknown> | null;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @Column({ name: 'author_id', type: 'uuid', nullable: true })
  authorId: string | null;

  @Column({ name: 'manufacturer_id', type: 'uuid', nullable: true })
  manufacturerId: string | null;

  @Column({ name: 'is_digital', type: 'boolean', default: false })
  isDigital: boolean;

  @Column({ name: 'is_external', type: 'boolean', default: false })
  isExternal: boolean;

  @Column({ name: 'external_product_url', type: 'varchar', nullable: true })
  externalProductUrl: string | null;

  @Column({ name: 'external_product_button_text', type: 'varchar', nullable: true })
  externalProductButtonText: string | null;

  @Column({ name: 'blocked_dates', type: 'text', nullable: true })
  blockedDates: string | null;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ name: 'in_flash_sale', type: 'boolean', default: false })
  inFlashSale: boolean;

  @Column({ name: 'is_rental', type: 'boolean', default: false })
  isRental: boolean;

  @Column({ name: 'sold_quantity', type: 'int', default: 0 })
  soldQuantity: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Type, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;

  @ManyToOne(() => Author, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Author | null;

  @ManyToOne(() => Manufacturer, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer | null;
}
