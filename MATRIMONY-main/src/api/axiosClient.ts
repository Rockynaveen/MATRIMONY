// Lightweight, type-safe Axios API client adapter

interface AxiosRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
}

interface AxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

class AxiosClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async parseResponseBody(response: Response): Promise<any> {
    const text = await response.text().catch(() => '');
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      if (response.status === 404) {
        return { message: 'API endpoint not found (404)' };
      }
      return { message: text.replace(/<[^>]*>?/gm, '').trim().substring(0, 200) || 'Server returned non-JSON response' };
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      headers: { ...this.getAuthHeaders(), ...(config?.headers || {}) }
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }

  async post<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: { ...this.getAuthHeaders(), ...(config?.headers || {}) },
      body: JSON.stringify(body)
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }

  async patch<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PATCH',
      headers: { ...this.getAuthHeaders(), ...(config?.headers || {}) },
      body: JSON.stringify(body)
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }

  async put<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: { ...this.getAuthHeaders(), ...(config?.headers || {}) },
      body: JSON.stringify(body)
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeaders(), ...(config?.headers || {}) }
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }

  async postForm<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = { ...(config?.headers || {}) };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await this.parseResponseBody(response);
    return { data, status: response.status, statusText: response.statusText };
  }
}

// In dev → '/api' (Vite proxy handles CORS)
// In prod → full backend URL
const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_BASE_URL || 'https://matrimony-production-e116.up.railway.app/api');
export const axiosClient = new AxiosClient(API_BASE_URL);
