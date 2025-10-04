import { useState } from 'react';
import { authApi, authApiEndpoints } from '../api/authApi';
import { LoginDto, RegisterDto } from '@/types';

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.post(authApiEndpoints.login, credentials);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.post(authApiEndpoints.register, userData);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error en el registro';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoading,
    error,
  };
};