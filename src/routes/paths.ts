// Application paths
export const PATHS = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  TASKS: '/tasks',
} as const;

// Helper functions for path generation
export const getAuthLoginPath = () => PATHS.AUTH.LOGIN;
export const getAuthRegisterPath = () => PATHS.AUTH.REGISTER;
export const getTasksPath = () => PATHS.TASKS;
export const getHomePath = () => PATHS.HOME;