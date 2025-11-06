# React + Vite + Tailwind + Express + MongoDB Template

Plantilla básica para crear proyectos full-stack con React, Vite, Tailwind CSS v4, Express y MongoDB.

## 🚀 Estructura del Proyecto

```
.
├── front/          # Frontend con Vite + React + Tailwind CSS v4
└── server/         # Backend con Express + MongoDB
```

## 📋 Prerequisitos

- Node.js (v18 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

## 🛠️ Instalación

### Instalación rápida (desde la raíz)

```bash
# Instalar todas las dependencias (raíz, frontend y servidor)
npm run install:all
```

### Instalación manual

Si prefieres instalar por separado:

```bash
# 1. Instalar dependencias de la raíz
npm install

# 2. Instalar dependencias del Frontend
npm run install:front
# O manualmente: cd front && npm install

# 3. Instalar dependencias del Servidor
npm run install:server
# O manualmente: cd server && npm install
```

### 4. Configurar variables de entorno del Servidor

```bash
cd server
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones si es necesario (por defecto usa MongoDB local).

## 🏃 Ejecutar el Proyecto

### Ejecutar todo desde la raíz (recomendado)

```bash
# Ejecutar frontend y servidor simultáneamente
npm run dev
```

Esto iniciará:
- Frontend en `http://localhost:5173`
- Servidor en `http://localhost:3000`

### Ejecutar por separado

**Desde la raíz:**
```bash
# Solo frontend
npm run dev:front

# Solo servidor
npm run dev:server
```

**O desde cada carpeta:**
```bash
# Frontend
cd front
npm run dev

# Servidor (asegúrate de que MongoDB esté corriendo)
cd server
npm run dev
```

## 📦 Tecnologías

### Frontend
- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS v4** - Framework de CSS utility-first

### Backend
- **Express** - Framework web para Node.js
- **Mongoose** - ODM para MongoDB
- **CORS** - Habilitar CORS para el frontend
- **dotenv** - Variables de entorno

## 🎯 Endpoints del Servidor

- `GET /` - Mensaje de bienvenida
- `GET /api/health` - Estado del servidor y base de datos
- `GET /api/test` - Endpoint de prueba

## 📝 Notas

- Este es un template básico listo para ser extendido
- Tailwind CSS v4 está configurado usando el plugin de Vite
- El servidor está configurado para conectarse a MongoDB local por defecto
- Ambos proyectos tienen sus propios `package.json` independientes

## 🔧 Comandos Disponibles (desde la raíz)

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecuta frontend y servidor simultáneamente |
| `npm run dev:front` | Ejecuta solo el frontend |
| `npm run dev:server` | Ejecuta solo el servidor |
| `npm run build` | Construye el frontend para producción |
| `npm run install:all` | Instala todas las dependencias |
| `npm run install:front` | Instala dependencias del frontend |
| `npm run install:server` | Instala dependencias del servidor |

## 📝 Notas

- Este es un template básico listo para ser extendido
- Tailwind CSS v4 está configurado usando el plugin de Vite
- El servidor está configurado para conectarse a MongoDB local por defecto
- Puedes ejecutar todo desde la raíz con `npm run dev`
- Ambos proyectos tienen sus propios `package.json` independientes

