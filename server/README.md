# Server - Express + MongoDB

Servidor backend con Express y MongoDB (Mongoose).

## 🚀 Inicio Rápido

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Asegúrate de que MongoDB esté corriendo localmente

4. Ejecutar el servidor:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura

```
server/
├── models/          # Modelos de Mongoose
├── routes/          # Rutas de Express
├── controllers/     # Controladores
├── index.js         # Archivo principal del servidor
└── package.json
```

## 🔧 Configuración

- **PORT**: Puerto del servidor (default: 3000)
- **MONGODB_URI**: URI de conexión a MongoDB (default: mongodb://localhost:27017/myapp)

## 📝 Endpoints

- `GET /` - Mensaje de bienvenida
- `GET /api/health` - Estado del servidor y base de datos
- `GET /api/test` - Endpoint de prueba

