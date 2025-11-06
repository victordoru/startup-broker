import express from 'express';
import { createSurvey, getAllSurveys, getSurveyStats } from '../controllers/survey.controller.js';

const router = express.Router();

// POST /api/survey - Create a new survey response
router.post('/', createSurvey);

// GET /api/survey - Get all surveys (for analytics/admin)
router.get('/', getAllSurveys);

// GET /api/survey/stats - Get survey statistics
router.get('/stats', getSurveyStats);

export default router;

