'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/context/AuthContext';
import { PATHS } from '@/routes/paths';
import TasksPage from '@/features/tasks/components/TasksPage';

export default function TasksPageWrapper() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(PATHS.AUTH.LOGIN);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Cargando...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <TasksPage />;
}