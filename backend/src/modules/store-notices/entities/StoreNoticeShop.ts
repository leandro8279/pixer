import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Shop } from '@/modules/shops/entities/Shop';
import { StoreNotice } from './StoreNotice';

@Entity('store_notice_shop')
export class StoreNoticeShop {
  @PrimaryColumn({ name: 'store_notice_id', type: 'uuid' })
  storeNoticeId: string;

  @PrimaryColumn({ name: 'shop_id', type: 'uuid' })
  shopId: string;

  @ManyToOne(() => StoreNotice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'store_notice_id' })
  storeNotice: StoreNotice;

  @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;
}
