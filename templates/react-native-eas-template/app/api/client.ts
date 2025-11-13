import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ENV } from '../../config/env';
import { logger } from '../utils/logger';
import { secureStorage } from '../utils/secureStorage';

/**
 * Production-ready API client with interceptors
 */

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: ENV.API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token
        const token = await secureStorage.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add API key if needed
        if (ENV.API_KEY) {
          config.headers['X-API-Key'] = ENV.API_KEY;
        }

        // Log request in development
        logger.logApiRequest(config.method?.toUpperCase() || 'GET', config.url || '', config.data);

        return config;
      },
      (error) => {
        logger.error('Request interceptor error', { error });
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.logApiResponse(
          response.config.method?.toUpperCase() || 'GET',
          response.config.url || '',
          response.status,
          response.data
        );
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.client(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Attempt to refresh token
            const refreshToken = await secureStorage.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshAuthToken(refreshToken);
              await secureStorage.setAuthToken(response.accessToken);

              // Retry all queued requests
              this.failedQueue.forEach(({ resolve }) => resolve());
              this.failedQueue = [];

              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, clear auth and redirect to login
            this.failedQueue.forEach(({ reject }) => reject(refreshError));
            this.failedQueue = [];
            await secureStorage.clearAuth();
            // You might want to emit an event here to redirect to login
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        logger.logApiError(
          error.config?.method?.toUpperCase() || 'GET',
          error.config?.url || '',
          error
        );

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async refreshAuthToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await this.client.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  private normalizeError(error: AxiosError): Error & { code?: string; statusCode?: number } {
    if (error.response) {
      // Server responded with error
      const serverError: any = new Error(
        error.response.data?.message || 'An error occurred'
      );
      serverError.statusCode = error.response.status;
      serverError.code = error.response.data?.code;
      return serverError;
    } else if (error.request) {
      // Request made but no response
      const networkError: any = new Error('Network error. Please check your connection.');
      networkError.code = 'NETWORK_ERROR';
      return networkError;
    } else {
      // Something else happened
      return error;
    }
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
