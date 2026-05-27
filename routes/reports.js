const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new report
router.post('/', async (req, res) => {
  try {
    const report = new Report(req.body);
    const saved = await report.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update status
router.patch('/:id/status', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;