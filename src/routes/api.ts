// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id: number) => `/tasks/${id}`,
  },
} as const;

// API base URLs
export const API_BASE_URLS = {
  AUTH: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  TASKS: 'http://localhost:3001',
} as const;