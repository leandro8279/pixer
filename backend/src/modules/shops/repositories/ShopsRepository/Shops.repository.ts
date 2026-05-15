import { Shop } from '@/modules/shops/entities/Shop';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateShopData, IShopsRepository, UpdateShopData } from './IShops.repository';

@Injectable()
export class ShopsRepository implements IShopsRepository {
  constructor(@InjectRepository(Shop) private repository: Repository<Shop>) {}

  public async create(params: CreateShopData): Promise<Shop> {
    return this.repository.save(this.repository.create(params));
  }

  public async update(id: string, params: UpdateShopData): Promise<Shop> {
    await this.repository.update(id, params);

    return this.repository.findOneBy({ id }) as Promise<Shop>;
  }

  public async findShopByIdOrSlug(idOrSlug: string, language: string, includeBalance: boolean): Promise<Shop | null> {
    const isId = /^\d+$/.test(String(idOrSlug));

    const qb = this.repository
      .createQueryBuilder('shop')
      .leftJoin('shop.owner', 'owner')
      .leftJoinAndSelect('shop.categories', 'categories')
      .leftJoin('owner.profile', 'profile')
      .addSelect(['owner.id', 'owner.email', 'profile.id', 'profile.name'])
      .leftJoinAndSelect('shop.ownerShipTransfers', 'ownerShipTransfers')
      .loadRelationCountAndMap('shop.ordersCount', 'shop.orders')
      .loadRelationCountAndMap('shop.productsCount', 'shop.products', 'products', (productsQb) =>
        productsQb.where('products.language = :language', { language }),
      );

    if (includeBalance) {
      qb.leftJoinAndSelect('shop.balance', 'balance');
    }

    if (isId) {
      qb.where('shop.id = :id', { id: idOrSlug });
    } else {
      qb.where('shop.slug = :slug', { slug: String(idOrSlug) });
    }

    return qb.getOne();
  }
}
