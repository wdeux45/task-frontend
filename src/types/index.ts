export interface User {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  user_id: number;
  message: string;
}