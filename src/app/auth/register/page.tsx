'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('');
      setSuccess('');
      await registerUser({ email: data.email, password: data.password });
      setSuccess('¡Registro exitoso! Por favor, inicia sesión.');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-md w-full m-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-10">
            <h2 className="text-center text-3xl font-bold text-white">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-center text-purple-100 text-sm">
              Únete a nosotros hoy
            </p>
          </div>
          <form className="px-8 py-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r animate-pulse">
                <p className="font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-r animate-pulse">
                <p className="font-medium">{success}</p>
              </div>
            )}
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2 ml-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2 ml-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-2 ml-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando cuenta...
                  </>
                ) : 'Crear Cuenta'}
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  href="/auth/login"
                  className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}