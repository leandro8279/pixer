import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_CRED, TOKEN } from '@/utils/constants';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

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
        const authCred = localStorage.getItem(AUTH_CRED);
        const token = authCred
          ? (JSON.parse(authCred) as Record<string, string>)[TOKEN]
          : null;

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

  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.get<T>(url, config);
    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.put<T>(url, data, config);
    return response.data;
  }

  protected async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.delete<T>(url, config);
    return response.data;
  }
}
