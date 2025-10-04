import axios from 'axios';
import { API_BASE_URLS, API_ENDPOINTS } from '@/routes/api';

export const authApi = axios.create({
  baseURL: API_BASE_URLS.AUTH,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApiEndpoints = {
  login: API_ENDPOINTS.AUTH.LOGIN,
  register: API_ENDPOINTS.AUTH.REGISTER,
};