# 📋 Task Manager - Frontend

Aplicación web moderna para gestión de tareas construida con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Validación**: Zod + React Hook Form
- **HTTP Client**: Axios
- **Autenticación**: JWT (Context API)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/
│   │   ├── login/          # Página de inicio de sesión
│   │   └── register/       # Página de registro
│   ├── tasks/              # Gestión de tareas
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── contexts/
│   └── AuthContext.tsx     # Contexto de autenticación
├── lib/
│   └── api.ts              # Configuración de Axios
└── types/
    └── index.ts            # Tipos TypeScript
```

## ⚙️ Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
Crear archivo `.env.local` en la raíz:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🎨 Características

### Autenticación
- ✅ Registro de usuarios con validación
- ✅ Inicio de sesión con JWT
- ✅ Protección de rutas privadas
- ✅ Persistencia de sesión (localStorage)

### Gestión de Tareas
- ✅ Crear tareas con título, descripción y estado
- ✅ Editar tareas existentes
- ✅ Eliminar tareas con confirmación
- ✅ Estados: Pendiente, En Progreso, Completada
- ✅ Interfaz moderna con animaciones

### Diseño
- ✅ Diseño responsive y moderno
- ✅ Gradientes y animaciones fluidas
- ✅ Iconos SVG integrados
- ✅ Mensajes de error/éxito intuitivos
- ✅ Interfaz en español

## 📝 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Compilar para producción
npm run start    # Ejecutar build de producción
npm run lint     # Ejecutar linter
```

## 🔗 Endpoints del Backend

La aplicación se conecta al backend en `http://localhost:3001/api`:

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Crear nueva tarea
- `PUT /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

## 🛠️ Tecnologías Adicionales

- **next/font**: Optimización de fuentes
- **ESLint**: Linting y calidad de código
- **PostCSS**: Procesamiento de CSS

## 📦 Dependencias Principales

```json
{
  "next": "^15.0.3",
  "react": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "axios": "^1.7.9",
  "zod": "^3.24.1",
  "react-hook-form": "^7.54.2"
}
```

## 🌐 Navegación

- `/` - Página de inicio (redirige a login)
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de usuario
- `/tasks` - Gestión de tareas (requiere autenticación)

---

**Desarrollado con ❤️ usando Next.js**
