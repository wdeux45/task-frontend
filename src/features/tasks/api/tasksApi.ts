import axios from 'axios';
import { API_BASE_URLS, API_ENDPOINTS } from '@/routes/api';

export const tasksApi = axios.create({
  baseURL: API_BASE_URLS.TASKS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to task requests
tasksApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tasksApiEndpoints = {
  getAll: API_ENDPOINTS.TASKS.BASE,
  create: API_ENDPOINTS.TASKS.BASE,
  update: (id: number) => API_ENDPOINTS.TASKS.BY_ID(id),
  delete: (id: number) => API_ENDPOINTS.TASKS.BY_ID(id),
};