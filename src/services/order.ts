import { API_ENDPOINTS } from '@/config/endpoints';

import { BaseService } from './base';

import type { GenerateInvoiceDownloadUrlInput, Order, OrderPaginator, OrderQueryOptions } from '@/types';

export class OrderService extends BaseService {
  find = ({ id, language }: { id: string; language: string }) => {
    return this.get<Order>(`${API_ENDPOINTS.ORDERS}/${id}`, { language });
  };

  paginated = ({ tracking_number, ...params }: Partial<OrderQueryOptions>) => {
    const search = this.formatSearchParams({ tracking_number });

    return this.get<OrderPaginator>(API_ENDPOINTS.ORDERS, { searchJoin: 'and', ...params, search });
  };

  downloadInvoice = (input: GenerateInvoiceDownloadUrlInput) => {
    return this.post<string>(`${API_ENDPOINTS.ORDER_INVOICE_DOWNLOAD}`, input);
  };

  orderSeen = ({ id }: { id: string }) => {
    return this.post<any>(`${API_ENDPOINTS.ORDER_SEEN}/${id}`, id);
  };
}
