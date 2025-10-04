import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types';
import { useTasksApi } from './useTasksApi';

export const useTasksState = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchTasks, createTask, updateTask, deleteTask, isLoading } = useTasksApi();

  const loadTasks = useCallback(async () => {
    try {
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  const addTask = useCallback(async (taskData: CreateTaskDto) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  }, [createTask]);

  const editTask = useCallback(async (id: number, taskData: UpdateTaskDto) => {
    try {
      setError(null);
      const updatedTask = await updateTask(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  }, [updateTask]);

  const removeTask = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  }, [deleteTask]);

  useEffect(() => {
    loadTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    tasks,
    loading,
    error,
    isLoading,
    loadTasks,
    addTask,
    editTask,
    removeTask,
  };
};