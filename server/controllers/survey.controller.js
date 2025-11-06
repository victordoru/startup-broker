import { Survey } from '../models/survey.model.js';

// Create a new survey response
export const createSurvey = async (req, res) => {
  try {
    // Validate required fields
    const {
      rolActual,
      tipoOrganizacion,
      satisfaccionComision,
      pagaCuotas,
      pensadoMarcaPropia,
      disposicionPago,
      modeloPago,
      interesaSolucion,
      quiereAviso
    } = req.body;

    // Check required fields
    if (!rolActual || !tipoOrganizacion || !satisfaccionComision || 
        pagaCuotas === undefined || !pensadoMarcaPropia || 
        !disposicionPago || !modeloPago || !interesaSolucion || 
        quiereAviso === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    // Validate satisfaccionComision range
    if (satisfaccionComision < 1 || satisfaccionComision > 5) {
      return res.status(400).json({
        success: false,
        message: 'La satisfacción debe estar entre 1 y 5'
      });
    }

    // Create survey
    const survey = new Survey(req.body);
    await survey.save();

    res.status(201).json({
      success: true,
      message: 'Encuesta guardada correctamente',
      data: {
        id: survey._id,
        createdAt: survey.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating survey:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al guardar la encuesta'
    });
  }
};

// Get all surveys (for analytics/admin)
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: surveys.length,
      data: surveys
    });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las encuestas'
    });
  }
};

// Get survey statistics
export const getSurveyStats = async (req, res) => {
  try {
    const total = await Survey.countDocuments();
    
    // Marca propia interest
    const marcaPropiaStats = await Survey.aggregate([
      {
        $group: {
          _id: '$pensadoMarcaPropia',
          count: { $sum: 1 }
        }
      }
    ]);

    // Interest in solution
    const interesStats = await Survey.aggregate([
      {
        $group: {
          _id: '$interesaSolucion',
          count: { $sum: 1 }
        }
      }
    ]);

    // Leads (quiere aviso)
    const leads = await Survey.countDocuments({ quiereAviso: true });

    res.json({
      success: true,
      data: {
        total,
        marcaPropiaStats,
        interesStats,
        leads,
        leadsPercentage: total > 0 ? ((leads / total) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching survey stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las estadísticas'
    });
  }
};

