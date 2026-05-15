import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { OrderStatus, PaymentStatus } from '@/shared/enums';
import { User } from '@/modules/auth/entities/User';
import { Shop } from '@/modules/shops/entities/Shop';
import { Coupon } from './Coupon';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tracking_number', type: 'varchar', unique: true })
  trackingNumber: string;

  @Column({ name: 'customer_id', type: 'uuid', nullable: true })
  customerId: string | null;

  @Column({ name: 'customer_contact', type: 'varchar' })
  customerContact: string;

  @Column({ name: 'customer_name', type: 'varchar', nullable: true })
  customerName: string | null;

  @Column({ type: 'float' })
  amount: number;

  @Column({ name: 'sales_tax', type: 'float', nullable: true })
  salesTax: number | null;

  @Column({ name: 'paid_total', type: 'float', nullable: true })
  paidTotal: number | null;

  @Column({ type: 'float', nullable: true })
  total: number | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ name: 'coupon_id', type: 'uuid', nullable: true })
  couponId: string | null;

  @Column({ type: 'float', nullable: true })
  discount: number | null;

  @Column({ name: 'payment_gateway', type: 'varchar', nullable: true })
  paymentGateway: string | null;

  @Column({ name: 'altered_payment_gateway', type: 'varchar', nullable: true })
  alteredPaymentGateway: string | null;

  @Column({ name: 'shipping_address', type: 'json', nullable: true })
  shippingAddress: Record<string, unknown> | null;

  @Column({ name: 'billing_address', type: 'json', nullable: true })
  billingAddress: Record<string, unknown> | null;

  @Column({ name: 'logistics_provider', type: 'uuid', nullable: true })
  logisticsProvider: string | null;

  @Column({ name: 'delivery_fee', type: 'float', nullable: true })
  deliveryFee: number | null;

  @Column({ name: 'delivery_time', type: 'varchar', nullable: true })
  deliveryTime: string | null;

  @Column({ name: 'order_status', type: 'enum', enum: OrderStatus, default: OrderStatus.ORDER_RECEIVED })
  orderStatus: OrderStatus;

  @Column({ name: 'payment_status', type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAYMENT_PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  language: string | null;

  @Column({ name: 'shop_id', type: 'uuid', nullable: true })
  shopId: string | null;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string | null;

  @Column({ name: 'cancelled_amount', type: 'decimal', default: 0 })
  cancelledAmount: number;

  @Column({ name: 'cancelled_tax', type: 'decimal', default: 0 })
  cancelledTax: number;

  @Column({ name: 'cancelled_delivery_fee', type: 'decimal', default: 0 })
  cancelledDeliveryFee: number;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: User | null;

  @ManyToOne(() => Coupon, { nullable: true })
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon | null;

  @ManyToOne(() => Shop, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop | null;

  @ManyToOne(() => Order, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Order | null;
}
