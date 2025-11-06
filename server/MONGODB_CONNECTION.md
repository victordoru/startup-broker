# Guía de Conexión a MongoDB

## 📋 Formato de la URI de MongoDB

La URI de conexión a MongoDB sigue este formato:

```
mongodb://[usuario:contraseña@]host[:puerto]/[nombre_base_datos][?opciones]
```

## 🔧 Opciones de Conexión

### 1. MongoDB Local (por defecto)

Si tienes MongoDB instalado y corriendo localmente:

```env
MONGODB_URI=mongodb://localhost:27017/myapp
```

**Explicación:**
- `localhost:27017` - Host y puerto por defecto de MongoDB
- `myapp` - Nombre de la base de datos (puedes cambiarlo)

**Requisitos:**
- MongoDB debe estar corriendo en tu máquina
- Por defecto MongoDB usa el puerto 27017

### 2. MongoDB Local con Autenticación

Si configuraste un usuario y contraseña en MongoDB:

```env
MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/myapp
```

**Ejemplo:**
```env
MONGODB_URI=mongodb://admin:miPassword123@localhost:27017/myapp
```

### 3. MongoDB en un Puerto Diferente

Si MongoDB está en otro puerto:

```env
MONGODB_URI=mongodb://localhost:27018/myapp
```

### 4. MongoDB Atlas (Cloud)

Si usas MongoDB Atlas (servicio en la nube):

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_db?retryWrites=true&w=majority
```

**Ejemplo:**
```env
MONGODB_URI=mongodb+srv://admin:miPassword@cluster0.abc123.mongodb.net/myapp?retryWrites=true&w=majority
```

**Cómo obtener la URI de MongoDB Atlas:**
1. Ve a tu cluster en MongoDB Atlas
2. Click en "Connect"
3. Selecciona "Connect your application"
4. Copia la connection string
5. Reemplaza `<password>` con tu contraseña real

### 5. MongoDB con Opciones Adicionales

```env
MONGODB_URI=mongodb://localhost:27017/myapp?authSource=admin&ssl=true
```

**Opciones comunes:**
- `authSource=admin` - Base de datos de autenticación
- `ssl=true` - Habilitar SSL
- `retryWrites=true` - Reintentar escrituras
- `w=majority` - Write concern

## 🚀 Verificar que MongoDB está Corriendo

### macOS/Linux:
```bash
# Verificar si MongoDB está corriendo
ps aux | grep mongod

# O iniciar MongoDB (si está instalado)
brew services start mongodb-community
# O
mongod
```

### Windows:
```bash
# Verificar servicio
net start MongoDB

# O iniciar manualmente
mongod
```

## 📝 Ejemplo de .env

Crea un archivo `.env` en la carpeta `server/` con:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
# Para MongoDB local (sin autenticación):
MONGODB_URI=mongodb://localhost:27017/myapp

# Para MongoDB local con autenticación:
# MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/myapp

# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/myapp?retryWrites=true&w=majority
```

## ✅ Verificar la Conexión

Cuando ejecutes el servidor con `npm run dev`, deberías ver:

```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
```

Si ves un error, verifica:
1. Que MongoDB esté corriendo
2. Que la URI sea correcta
3. Que el puerto sea el correcto (por defecto 27017)
4. Si usas autenticación, que el usuario y contraseña sean correctos

