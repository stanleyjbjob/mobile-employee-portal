export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  hireDate: string;
  salary?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
  userId?: number;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expires: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ApiError {
  message: string;
  errors?: { [key: string]: string[] };
}