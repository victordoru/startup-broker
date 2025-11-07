/**
 * Script para crear usuario y base de datos en MongoDB
 * 
 * Uso:
 * 1. Conectarse a MongoDB como administrador:
 *    mongo admin -u admin -p
 * 
 * 2. O ejecutar este script directamente:
 *    node scripts/create-mongo-user.js
 * 
 * 3. Luego ejecutar el comando que se muestra en la consola
 */

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Script para crear usuario y base de datos MongoDB          ║
╚══════════════════════════════════════════════════════════════╝

📋 PASOS PARA CREAR USUARIO Y BASE DE DATOS:

1. Conectarse a MongoDB como administrador:
   
   Para MongoDB 6.0+ (mongosh):
   mongosh "mongodb://admin:TU_PASSWORD@localhost:27017/admin"
   O simplemente: mongosh admin
   
   Para MongoDB 5.x o anterior (mongo):
   mongo admin -u admin -p
   O simplemente: mongo admin
   
   Si mongosh no está instalado:
   sudo apt update && sudo apt install -y mongodb-mongosh

2. Ejecutar el siguiente comando en la consola de MongoDB:

db.createUser({
  user: "startup_user",
  pwd: "StartupSecurePass123!",
  roles: [
    { role: "readWrite", db: "startup" },
    { role: "dbAdmin", db: "startup" }
  ]
})

3. Verificar que el usuario se creó correctamente:
   use startup
   db.getUsers()

4. La URI de conexión será:
   mongodb://startup_user:StartupSecurePass123!@46.105.31.243:27017/startup?authSource=admin

⚠️  IMPORTANTE:
   - Cambia la contraseña "StartupSecurePass123!" por una más segura
   - Guarda la contraseña en un lugar seguro
   - No compartas estas credenciales públicamente

💡 ALTERNATIVA: Si prefieres usar el mismo usuario del proyecto anterior:
   Puedes reutilizar "victor_fotos" pero con una base de datos diferente:
   
   db.createUser({
     user: "victor_fotos",
     pwd: "Kekoinomano123",
     roles: [
       { role: "readWrite", db: "startup" },
       { role: "dbAdmin", db: "startup" }
     ]
   })
   
   URI: mongodb://victor_fotos:Kekoinomano123@46.105.31.243:27017/startup?authSource=admin

`);

