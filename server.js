const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/reports', require('./routes/reports'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'CityClean API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully ✅');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.log('Database connection error details:', err.message);
  });