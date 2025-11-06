import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime()
  });
});

// Example route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API endpoint working!',
    data: {
      example: 'This is a test endpoint'
    }
  });
});

// get number and return it multiplied by 2
app.get('/api/multiply/:number', (req, res) => {
  const { number } = req.params;
  const num = parseFloat(number);
  
  if (isNaN(num)) {
    return res.status(400).json({
      error: 'Invalid number provided'
    });
  }
  
  res.json({
    result: num * 2
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

