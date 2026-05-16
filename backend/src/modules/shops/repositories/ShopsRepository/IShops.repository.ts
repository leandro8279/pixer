import { Shop } from '@/modules/shops/entities/Shop';

export const SHOP_REPOSITORY = Symbol('IShopsRepository');

export type CreateShopData = Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateShopData = Partial<Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>>;

export interface ListShopsFilters {
  page: number;
  limit: number;
  language: string;
  search: string;
  searchJoin: string;
  isActive: boolean;
}

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
};

export interface IShopsRepository {
  create(params: CreateShopData): Promise<Shop>;
  update(id: string, params: UpdateShopData): Promise<Shop>;
  listShops(params: ListShopsFilters): Promise<PaginatedResult<Shop>>;
  findShopByIdOrSlug(idOrSlug: string, language: string, includeBalance: boolean): Promise<Shop | null>;
}
