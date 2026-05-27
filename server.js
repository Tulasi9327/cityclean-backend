const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({ origin: 'http://localhost:3000' })); // Enforce CORS for safe communication with the client port
app.use(express.json()); // Built-in parsing middleware for application/json requests

// Establish connection to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas Database');
  })
  .catch((err) => {
    console.error('Database connection error details:', err.message);
  });

// Root Route check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'CityClean API is running' });
});

// API Routes mounting
const reportRoutes = require('./routes/reports');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

// Catch-all route handler for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Requested resource not found.' });
});

// Global Express Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong inside the server.',
    error: err.message 
  });
});

// Bind to port and start listening
app.listen(PORT, () => {
  console.log(`Server executing live in port ${PORT}`);
});