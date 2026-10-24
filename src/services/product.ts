import type { GetParams, Product, ProductPaginator, ProductQueryOptions } from '@/types';
import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

export class ProductService extends BaseService {
  popular = ({ shop_id, ...params }: Partial<ProductQueryOptions>) => {
    const search = this.formatSearchParams({ shop_id });

    return this.get<Product[]>(API_ENDPOINTS.POPULAR_PRODUCTS, { searchJoin: 'and', with: 'type;shop', ...params, search });
  };

  lowStock = ({ shop_id, ...params }: Partial<ProductQueryOptions>) => {
    const search = this.formatSearchParams({ shop_id });
    return this.get<Product[]>(API_ENDPOINTS.LOW_STOCK_PRODUCTS_ANALYTICS, { searchJoin: 'and', with: 'type;shop', ...params, search });
  };
  topRated = ({ shop_id, ...params }: Partial<ProductQueryOptions>) => {
    const search = this.formatSearchParams({ shop_id });

    return this.get<Product[]>(API_ENDPOINTS.TOP_RATED_PRODUCTS, { searchJoin: 'and', ...params, search });
  };

  productByCategory = ({ limit, language }: { limit?: number; language?: string }) => {
    return this.get<any>(API_ENDPOINTS.CATEGORY_WISE_PRODUCTS, { limit, language });
  };

  findBySlug = ({ slug, language }: GetParams) => {
    return this.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`, {
      language,
      with: 'type;shop;categories;tags;variations.attribute.values;variation_options;variation_options.digital_file;author;manufacturer;digital_file',
    });
  };

  paginated = ({ type, name, categories, shop_id, product_type, status, ...params }: Partial<ProductQueryOptions>) => {
    const search = this.formatSearchParams({ type, name, categories, shop_id, product_type, status });

    return this.get<ProductPaginator>(API_ENDPOINTS.PRODUCTS, { searchJoin: 'and', with: 'shop;type;categories', shop_id, ...params, search });
  };

  lowOrOutOfStockProducts = ({ user_id, shop_id, status, categories, name, type, ...params }: Partial<ProductQueryOptions>) => {
    const searchJoin = 'and';
    const search = this.formatSearchParams({ status, name, categories, type });

    return this.get<ProductPaginator>(API_ENDPOINTS.LOW_OR_OUT_OF_STOCK_PRODUCTS, { searchJoin, user_id, shop_id, status, name, ...params, search });
  };

  mostSoldProductByCategory = ({ shop_id, ...params }: Partial<ProductQueryOptions>) => {
    const search = this.formatSearchParams({ shop_id });

    return this.get<Product[]>(API_ENDPOINTS.CATEGORY_WISE_PRODUCTS_SALE, { searchJoin: 'and', ...params, search });
  };

  newOrInActiveProducts = ({ user_id, shop_id, status, name, ...params }: Partial<ProductQueryOptions>) => {
    const searchJoin = 'and';
    const search = this.formatSearchParams({ status, name });
    return this.get<ProductPaginator>(API_ENDPOINTS.NEW_OR_INACTIVE_PRODUCTS, { searchJoin, user_id, shop_id, status, name, ...params, search });
  };
}
