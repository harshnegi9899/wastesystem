// models/Metric.js
const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  totalPickups: Number,
  recyclables: Number,
  organic: Number,
  general: Number,
});

module.exports = mongoose.model('Metric', MetricSchema);
