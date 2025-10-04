'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginDto, RegisterDto } from '@/types';
import { authApi, authApiEndpoints } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info (simplified)
      // In a real app, you'd validate the token with the server
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.userId, email: payload.email });
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginDto) => {
    try {
      const response = await authApi.post(authApiEndpoints.login, credentials);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      setUser({ id: payload.userId, email: payload.email });
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterDto) => {
    try {
      await authApi.post(authApiEndpoints.register, userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};