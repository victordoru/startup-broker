import axios from 'axios';

// API service for connecting to the backend server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health check
  async getHealth() {
    const response = await apiClient.get('/api/health');
    return response.data;
  },

  // Test endpoint
  async getTest() {
    const response = await apiClient.get('/api/test');
    return response.data;
  },

  // Multiply endpoint
  async getMultiply(number) {
    const response = await apiClient.get(`/api/multiply/${number}`);
    return response.data;
  },

  // Submit survey response
  async submitSurvey(surveyData) {
    const response = await apiClient.post('/api/survey', surveyData);
    return response.data;
  },

  // Get all surveys (for analytics/admin)
  async getAllSurveys() {
    const response = await apiClient.get('/api/survey');
    return response.data;
  },

  // Get survey statistics
  async getSurveyStats() {
    const response = await apiClient.get('/api/survey/stats');
    return response.data;
  },
};

