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
    const where = isId ? { id: idOrSlug } : { slug: String(idOrSlug) };

    // const include: Record<string, unknown> = {
    //   categories: true,
    //   owner: { include: { profile: true } },
    //   ownership_transfers: true,
    //   _count: {
    //     select: {
    //       orders: true,
    //       products: { where: { language } },
    //     },
    //   },
    // };

    return this.repository.findOne({
      where: { ...where },
      relations: {
        // owner: true,
        // categories: true,
        balance: includeBalance,
        // ownerShipTransfers: true,
      },
    });
  }
}
