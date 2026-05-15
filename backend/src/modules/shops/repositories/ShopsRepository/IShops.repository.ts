import { Shop } from '@/modules/shops/entities/Shop';

export const SHOP_REPOSITORY = Symbol('IShopsRepository');

export type CreateShopData = Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateShopData = Partial<Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>>;

export interface IShopsRepository {
  create(params: CreateShopData): Promise<Shop>;
  update(id: string, params: UpdateShopData): Promise<Shop>;
  findShopByIdOrSlug(idOrSlug: string, language: string, includeBalance: boolean): Promise<Shop | null>;
}
