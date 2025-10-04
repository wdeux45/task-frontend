'use client';

import { useState, useCallback, memo } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types';
import { useTasksState } from '../hooks/useTasksState';
import TaskForm from './TaskForm';

export default function TasksPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasksState();

  const handleCreateTask = useCallback((data: CreateTaskDto | UpdateTaskDto) => {
    addTask(data as CreateTaskDto);
    setShowCreateForm(false);
  }, [addTask]);

  const handleUpdateTask = useCallback((taskId: number, data: CreateTaskDto | UpdateTaskDto) => {
    editTask(taskId, data as UpdateTaskDto);
    setEditingTask(null);
  }, [editTask]);

  const handleDeleteTask = useCallback((taskId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      removeTask(taskId);
    }
  }, [removeTask]);

  const handleShowCreateForm = useCallback(() => {
    setShowCreateForm(true);
  }, []);

  const handleHideCreateForm = useCallback(() => {
    setShowCreateForm(false);
  }, []);

  const handleStartEdit = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

// Memoized TaskItem component to prevent unnecessary re-renders
const TaskItem = memo(({ task, isEditing, onEdit, onDelete, onUpdate, onCancel }: {
  task: Task;
  isEditing: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (taskId: number, data: CreateTaskDto | UpdateTaskDto) => void;
  onCancel: () => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
      case 'in-progress':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in-progress':
        return 'En Progreso';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-150">
      {isEditing ? (
        <TaskForm
          task={task}
          onSubmit={(data) => onUpdate(task.id, data)}
          onCancel={onCancel}
        />
      ) : (
        <div className="flex items-start justify-between space-x-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{task.title}</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(task.status)}`}>
                {getStatusText(task.status)}
              </span>
            </div>
            {task.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
            )}
          </div>
          <div className="flex flex-shrink-0 space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Editar</span>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Cargando tareas...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mis Tareas
              </h1>
              <p className="text-sm text-gray-500 mt-1">Organiza y gestiona tus actividades</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500">Bienvenido</p>
                <p className="text-sm font-medium text-gray-700">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r mb-6 animate-pulse shadow-md">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={handleShowCreateForm}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar Nueva Tarea</span>
            </button>
          </div>

          {showCreateForm && (
            <div className="mb-6">
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={handleHideCreateForm}
              />
            </div>
          )}

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isEditing={editingTask?.id === task.id}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                  onCancel={handleCancelEdit}
                />
              ))}
              {tasks.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">¡No hay tareas aún!</p>
                  <p className="text-gray-400 text-sm mt-1">Crea tu primera tarea para comenzar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}