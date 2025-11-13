import { config } from '@/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = config.apiUrl;
    this.defaultTimeout = config.apiTimeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /**
   * Set authorization token for authenticated requests
   */
  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Clear authorization token
   */
  clearAuthToken() {
    const { Authorization, ...rest } = this.defaultHeaders as any;
    this.defaultHeaders = rest;
  }

  /**
   * Make a request with timeout support
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestConfig = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Make a request with retry logic
   */
  private async fetchWithRetry(
    url: string,
    options: RequestConfig = {}
  ): Promise<Response> {
    const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, fetchOptions);

        // Don't retry on successful responses or client errors (4xx)
        if (response.ok || (response.status >= 400 && response.status < 500)) {
          return response;
        }

        // Retry on server errors (5xx)
        if (attempt < retries) {
          const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
          await this.sleep(delay);
          continue;
        }

        return response;
      } catch (error) {
        lastError = error as Error;

        // Don't retry on timeout or network errors on last attempt
        if (attempt >= retries) {
          throw error;
        }

        // Wait before retrying
        const delay = retryDelay * Math.pow(2, attempt);
        await this.sleep(delay);
      }
    }

    throw lastError || new NetworkError('Request failed after retries');
  }

  /**
   * Parse response based on content type
   */
  private async parseResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return response.text();
  }

  /**
   * Main request method
   */
  private async request<T>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    try {
      const response = await this.fetchWithRetry(url, {
        ...options,
        headers,
      });

      const data = await this.parseResponse(response);

      if (!response.ok) {
        throw new ApiError(
          data?.message || `Request failed with status ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError || error instanceof NetworkError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new NetworkError(error.message);
      }

      throw new NetworkError('An unexpected error occurred');
    }
  }

  /**
   * HTTP Methods
   */
  async get<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Utility method to sleep/delay
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
