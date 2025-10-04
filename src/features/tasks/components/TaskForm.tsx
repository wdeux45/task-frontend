import { useState, useCallback, memo } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => void;
  onCancel: () => void;
}

function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskDto>({
    title: task?.title || '',
    description: task?.description || '',
    status: (task?.status || 'pending') as 'pending' | 'in-progress' | 'completed',
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, status: e.target.value as 'pending' | 'in-progress' | 'completed' }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Título de la Tarea
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
            placeholder="Ej: Completar el informe mensual"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={3}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
            placeholder="Agrega detalles adicionales sobre la tarea..."
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleStatusChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
          >
            <option value="pending">Pendiente</option>
            <option value="in-progress">En Progreso</option>
            <option value="completed">Completada</option>
          </select>
        </div>
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{task ? 'Actualizar Tarea' : 'Crear Tarea'}</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default memo(TaskForm);