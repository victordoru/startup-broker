# 🚀 Guía de Despliegue en Servidor

Esta guía te ayudará a desplegar el proyecto startup en tu servidor.

## 📋 Requisitos Previos

- Servidor Ubuntu con acceso SSH
- MongoDB instalado y corriendo
- Node.js y npm instalados
- Apache configurado
- Acceso a MongoDB como administrador

## 🔧 Paso 1: Configurar MongoDB

### Opción A: Crear nuevo usuario y base de datos (Recomendado)

1. Conectarse a MongoDB como administrador:

**Para MongoDB 6.0+ (mongosh):**
```bash
# Con credenciales de administrador:
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@localhost:27017/admin"
# O desde la IP del servidor:
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@46.105.31.243:27017/admin"

# Si tienes un Replica Set, conecta directamente al primary:
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@localhost:27017/admin?replicaSet=rs0&readPreference=primary"
# O usa la conexión con múltiples hosts para que MongoDB encuentre el primary automáticamente
```

**Para MongoDB 5.x o anterior (mongo):**
```bash
mongo admin -u admin -p
# O simplemente: mongo admin
```

**Si mongosh no está instalado:**
```bash
# Instalar mongosh
sudo apt update
sudo apt install -y mongodb-mongosh
```

2. Crear usuario y base de datos:
```javascript
db.createUser({
  user: "startup_user",
  pwd: "TU_CONTRASEÑA_SEGURA_AQUI",
  roles: [
    { role: "readWrite", db: "startup" },
    { role: "dbAdmin", db: "startup" }
  ]
})
```

3. Verificar creación:
```javascript
use startup
db.getUsers()
```

### Opción B: Reutilizar usuario existente

Si prefieres usar el usuario `victor_fotos` del proyecto anterior:

**IMPORTANTE:** Si el usuario ya existe, NO uses `db.createUser()` (daría error). 
En su lugar, usa `db.grantRolesToUser()` para **añadir** roles sin borrar los anteriores:

```javascript
// Primero verificar que el usuario existe
use admin
db.getUser("victor_fotos")

// Añadir roles para la base de datos startup (NO borra los roles anteriores)
db.grantRolesToUser("victor_fotos", [
  { role: "readWrite", db: "startup" },
  { role: "dbAdmin", db: "startup" }
])

// Verificar que se añadieron correctamente
db.getUser("victor_fotos")
```

**Nota:** Esto **añadirá** permisos sobre la base de datos `startup` al usuario existente, 
manteniendo intactos los permisos sobre `photography-web`.

### Opción C: Usar el usuario admin directamente (Rápido, menos seguro)

Si prefieres usar directamente el usuario administrador `adminsergio`:

**Ventajas:**
- ✅ Rápido: No necesitas crear usuarios
- ✅ Funciona de inmediato

**Desventajas:**
- ⚠️ Menos seguro: El admin tiene acceso a todas las bases de datos
- ⚠️ Si alguien compromete la aplicación, tiene acceso completo

**Pasos:**
1. No necesitas crear nada en MongoDB, solo usar la URI del admin
2. La base de datos `startup` se creará automáticamente al conectarse

**En el archivo `.env`:**
```env
PORT=3000
MONGODB_URI=mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@46.105.31.243:27017/startup?authSource=admin
```

**Recomendación:** Usa esta opción solo para desarrollo/pruebas. Para producción, 
es mejor crear un usuario específico (Opción A).

## 🔐 Paso 2: Configurar Variables de Entorno

1. Crear archivo `.env` en la carpeta `server/`:
```bash
cd /var/www/html/startup/server
nano .env
```

2. Agregar la configuración:

**Si creaste nuevo usuario:**
```env
PORT=3000
MONGODB_URI=mongodb://startup_user:TU_CONTRASEÑA@46.105.31.243:27017/startup?authSource=admin
```

**Si reutilizaste victor_fotos:**
```env
PORT=3000
MONGODB_URI=mongodb://victor_fotos:Kekoinomano123@46.105.31.243:27017/startup?authSource=admin
```

**Si usas el admin directamente (Opción C):**
```env
PORT=3000
MONGODB_URI=mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@46.105.31.243:27017/startup?authSource=admin
```

3. Guardar y proteger el archivo:
```bash
chmod 600 .env
```

## 📦 Paso 3: Instalar Dependencias del Servidor

```bash
cd /var/www/html/startup/server
npm install
```

## 🏗️ Paso 4: Construir el Frontend

```bash
cd /var/www/html/startup/front
npm install
npm run build
```

El resultado estará en `/var/www/html/startup/front/dist`

## ⚙️ Paso 5: Configurar Apache

0. Verificar y habilitar módulos necesarios (si no están ya habilitados):

```bash
# Verificar qué módulos están habilitados
apache2ctl -M | grep -E "proxy|rewrite"

# Si no aparecen, habilitarlos:
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo systemctl reload apache2
```

**Nota:** Si ya tienes otros proyectos con proxy o rewrite, estos módulos probablemente ya estén habilitados. 
El comando `a2enmod` es seguro ejecutarlo aunque el módulo ya esté habilitado (solo dirá que ya está habilitado).

1. Crear archivo de configuración:
```bash
sudo nano /etc/apache2/sites-available/startup.conf
```

2. Agregar configuración (ajusta el dominio):
```apache
<VirtualHost *:80>
    ServerName tu-dominio.com
    ServerAlias www.tu-dominio.com
    
    # Frontend (React/Vite)
    DocumentRoot /var/www/html/startup/front/dist
    
    <Directory /var/www/html/startup/front/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # React Router - redirigir todas las rutas al index.html
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Backend API (Proxy a Node.js)
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3000/api
    ProxyPassReverse /api http://localhost:3000/api
    
    ErrorLog ${APACHE_LOG_DIR}/startup-error.log
    CustomLog ${APACHE_LOG_DIR}/startup-access.log combined
</VirtualHost>
```

3. Habilitar el sitio:
```bash
sudo a2ensite startup.conf
sudo systemctl reload apache2
```

## 🔄 Paso 6: Configurar PM2 para el Servidor Node.js

1. Instalar PM2 globalmente (si no está instalado):
```bash
sudo npm install -g pm2
```

2. Crear archivo de configuración PM2:
```bash
cd /var/www/html/startup/server
nano ecosystem.config.js
```

3. Agregar configuración:
```javascript
module.exports = {
  apps: [{
    name: 'startup-server',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/startup-error.log',
    out_file: '/var/log/pm2/startup-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

4. Iniciar con PM2:
```bash
cd /var/www/html/startup/server
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## ✅ Paso 7: Verificar que Todo Funciona

1. Verificar que el servidor Node.js está corriendo:
```bash
pm2 status
pm2 logs startup-server
```

2. Verificar conexión a MongoDB:
```bash
curl http://localhost:3000/api/health
```

3. Verificar que Apache está sirviendo el frontend:
```bash
curl http://localhost
```

4. Probar desde el navegador:
   - Frontend: `http://tu-dominio.com`
   - API Health: `http://tu-dominio.com/api/health`

## 🔍 Comandos Útiles

### Ver logs del servidor:
```bash
pm2 logs startup-server
```

### Reiniciar servidor:
```bash
pm2 restart startup-server
```

### Ver estado de PM2:
```bash
pm2 status
```

### Ver logs de Apache:
```bash
sudo tail -f /var/log/apache2/startup-error.log
sudo tail -f /var/log/apache2/startup-access.log
```

### Verificar conexión MongoDB:
```bash
# MongoDB 6.0+ (mongosh)
mongosh "mongodb://startup_user:TU_CONTRASEÑA@46.105.31.243:27017/startup?authSource=admin"

# MongoDB 5.x o anterior (mongo)
mongo mongodb://startup_user:TU_CONTRASEÑA@46.105.31.243:27017/startup?authSource=admin
```

## 🛠️ Solución de Problemas

### El servidor no se conecta a MongoDB:
1. Verificar que MongoDB está corriendo: `sudo systemctl status mongod`
2. Verificar que el usuario existe: `mongo admin -u admin -p` → `db.getUsers()`
3. Verificar la URI en el archivo `.env`
4. Verificar que el firewall permite conexiones en el puerto 27017

### El frontend no carga:
1. Verificar que el build se completó: `ls -la /var/www/html/startup/front/dist`
2. Verificar permisos: `sudo chown -R www-data:www-data /var/www/html/startup/front/dist`
3. Verificar configuración de Apache: `sudo apache2ctl -S`

### La API no responde:
1. Verificar que PM2 está corriendo: `pm2 status`
2. Verificar logs: `pm2 logs startup-server`
3. Verificar que el puerto 3000 está disponible: `netstat -tulpn | grep 3000`

### Error "not primary" o "NotWritablePrimary":
Si ves este error al intentar crear usuarios o escribir datos, significa que estás conectado a un nodo **secondary** de un Replica Set.

**Solución 1: Encontrar el nodo primary**
```javascript
// Dentro de mongosh, ejecuta:
rs.status()
// Busca el nodo con "stateStr": "PRIMARY" y su "name"
```

**Solución 2: Conectarse directamente al primary**
```bash
# Si el primary está en localhost:27017
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@localhost:27017/admin?readPreference=primary"

# O con replicaSet explícito
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@localhost:27017/admin?replicaSet=rs0&readPreference=primary"
```

**Solución 3: Usar la conexión con múltiples hosts**
Si conoces todos los hosts del replica set:
```bash
mongosh "mongodb://adminsergio:sjhbjlKjdg3lksjaQWcv@host1:27017,host2:27017,host3:27017/admin?replicaSet=rs0"
```

**Solución 4: Usar el admin directamente (más fácil)**
Si solo necesitas que funcione rápido, usa el admin directamente en el `.env` y MongoDB se conectará automáticamente al primary.

## 📝 Notas Importantes

- **Seguridad**: Nunca subas el archivo `.env` al repositorio
- **Backups**: Configura backups regulares de la base de datos MongoDB
- **SSL**: Considera configurar SSL/HTTPS con Let's Encrypt
- **Firewall**: Asegúrate de que solo los puertos necesarios están abiertos

