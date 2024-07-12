// routes/metrics.js
const express = require('express');
const router = express.Router();
const Metric = require('../models/Metric');
const auth = require('../middleware/auth');

// Get Metrics
router.get('/', auth, async (req, res) => {
  try {
    const metrics = await Metric.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Metric
router.post('/', auth, async (req, res) => {
  const { totalPickups, recyclables, organic, general } = req.body;
  try {
    const newMetric = new Metric({
      totalPickups,
      recyclables,
      organic,
      general,
    });
    await newMetric.save();
    res.status(201).json({ msg: 'Metric added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
