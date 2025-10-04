import { useState } from 'react';
import { tasksApi, tasksApiEndpoints } from '../api/tasksApi';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types';

export const useTasksApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (): Promise<Task[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tasksApi.get(tasksApiEndpoints.getAll);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al cargar las tareas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskDto): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tasksApi.post(tasksApiEndpoints.create, taskData);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al crear la tarea';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: number, taskData: UpdateTaskDto): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tasksApi.put(tasksApiEndpoints.update(id), taskData);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al actualizar la tarea';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await tasksApi.delete(tasksApiEndpoints.delete(id));
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Error al eliminar la tarea';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    isLoading,
    error,
  };
};