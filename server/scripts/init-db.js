import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Example } from '../models/example.model.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup';

async function initDatabase() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales en el log
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    // Crear un documento de ejemplo para activar la base de datos
    console.log('🔄 Creando documento de prueba...');
    const example = new Example({
      name: 'Documento de Inicialización',
      description: 'Este documento se creó para activar la base de datos en MongoDB'
    });
    
    await example.save();
    console.log('✅ Documento creado exitosamente');
    console.log('📄 ID del documento:', example._id);
    
    // Verificar que la base de datos existe
    const dbName = mongoose.connection.db.databaseName;
    console.log('📊 Base de datos activa:', dbName);
    
    // Listar las colecciones
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Colecciones en la base de datos:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Contar documentos en la colección Example
    const count = await Example.countDocuments();
    console.log(`📈 Total de documentos en 'examples': ${count}`);
    
    console.log('\n🎉 ¡Base de datos activada y lista para usar!');
    
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
  }
}

// Ejecutar la función
initDatabase();

