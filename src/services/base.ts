import axios from 'axios';
import Cookies from 'js-cookie';

import { SearchParamOptions } from '@/types';
import { AUTH_CRED } from '@/utils/constants';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const AUTH_TOKEN_KEY = import.meta.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? AUTH_CRED;

export class BaseService {
  protected readonly http: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.attachRequestInterceptor();
    this.attachResponseInterceptor();
  }

  private attachRequestInterceptor(): void {
    this.http.interceptors.request.use(
      (config) => {
        const authCred = Cookies.get(AUTH_TOKEN_KEY);
        const token = authCred ? JSON.parse(authCred)['token'] : null;

        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private attachResponseInterceptor(): void {
    this.http.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            localStorage.removeItem(AUTH_CRED);
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private formatBooleanSearchParam(key: string, value: boolean) {
    return value ? `${key}:1` : `${key}:`;
  }

  protected formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer', 'shops', 'refund_reason'].includes(k) ? `${k}.slug:${v}`
        : ['is_approved'].includes(k) ? this.formatBooleanSearchParam(k, v as boolean)
        : `${k}:${v}`,
      )
      .join(';');
  }

  protected async get<T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.get<T>(url, { ...config, params });
    return response.data;
  }

  protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.put<T>(url, data, config);
    return response.data;
  }

  protected async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.delete<T>(url, config);
    return response.data;
  }
}
