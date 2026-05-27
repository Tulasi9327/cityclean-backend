const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// @route   GET /api/reports
// @desc    Retrieve all reports from MongoDB Atlas, sorted by newest first
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ 
      error: 'Server Error', 
      message: 'Failed to retrieve reports. Please try again later.' 
    });
  }
});

// @route   POST /api/reports
// @desc    Create a new report and save it to MongoDB Atlas
router.post('/', async (req, res) => {
  try {
    const { name, contact, location, issueType, severity, description, lat, lng } = req.body;

    // Create a new document instance using the schema
    const newReport = new Report({
      name,
      contact,
      location,
      issueType,
      severity,
      description,
      lat,
      lng
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ 
      error: 'Validation Error', 
      message: error.message 
    });
  }
});

// @route   PATCH /api/reports/:id/status
// @desc    Update only the status of a specific report by ID
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Ensure status value is acceptable
    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true } // Returns the updated document and runs validation
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ 
      error: 'Update Failed', 
      message: error.message 
    });
  }
});

module.exports = router;