import mongoose from 'mongoose';

// Survey response model for real estate agents
const surveySchema = new mongoose.Schema({
  // Sección 1: Perfil
  rolActual: {
    type: String,
    required: true,
    enum: ['agente', 'responsable_equipo', 'direccion', 'otro']
  },
  rolActualOtro: {
    type: String,
    default: ''
  },
  tipoOrganizacion: {
    type: String,
    required: true,
    enum: ['agencia_tradicional', 'franquicia', 'autonomo', 'promotora', 'otro']
  },
  tipoOrganizacionOtro: {
    type: String,
    default: ''
  },
  ciudad: {
    type: String,
    default: ''
  },

  // Sección 2: Cómo te va hoy
  satisfaccionComision: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  pagaCuotas: {
    type: Boolean,
    required: true
  },
  montoCuotas: {
    type: String,
    default: ''
  },
  frustraciones: {
    type: [String],
    default: []
  },
  frustracionesOtro: {
    type: String,
    default: ''
  },

  // Sección 3: Marca propia
  pensadoMarcaPropia: {
    type: String,
    required: true,
    enum: ['si', 'planteando', 'no']
  },
  frenos: {
    type: [String],
    default: []
  },
  frenosOtro: {
    type: String,
    default: ''
  },
  disposicionPago: {
    type: String,
    required: true,
    enum: ['5', '10', '15', '20', '25', 'cuota_fija', 'nada']
  },
  modeloPago: {
    type: String,
    required: true,
    enum: ['porcentaje', 'porcentaje_cap', 'cuota_fija', 'pago_unico', 'no_se']
  },
  interesaSolucion: {
    type: String,
    required: true,
    enum: ['si', 'no']
  },

  // Sección 4: Cierre
  quiereAviso: {
    type: Boolean,
    required: true
  },
  nombre: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  telefono: {
    type: String,
    default: ''
  },
  comentariosAdicionales: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for analytics queries
surveySchema.index({ createdAt: -1 });
surveySchema.index({ pensadoMarcaPropia: 1 });
surveySchema.index({ interesaSolucion: 1 });

export const Survey = mongoose.model('Survey', surveySchema);

