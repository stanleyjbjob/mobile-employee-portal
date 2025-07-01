import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginRequest, RegisterRequest, Employee, ApiError } from '../types/api';

const API_BASE_URL = 'https://your-api-domain.com/api'; // Update with your actual API URL

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          await this.refreshToken();
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }

  async refreshToken(): Promise<AuthResponse | null> {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) return null;

      const response = await this.api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  // Employee endpoints
  async getEmployees(): Promise<Employee[]> {
    const response = await this.api.get<Employee[]>('/employees');
    return response.data;
  }

  async getEmployee(id: number): Promise<Employee> {
    const response = await this.api.get<Employee>(`/employees/${id}`);
    return response.data;
  }

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<void> {
    await this.api.put(`/employees/${id}`, employee);
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await this.api.post<Employee>('/employees', employee);
    return response.data;
  }

  async deleteEmployee(id: number): Promise<void> {
    await this.api.delete(`/employees/${id}`);
  }
}

export const apiService = new ApiService();