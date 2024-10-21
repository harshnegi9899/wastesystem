// models/Pickup.js
const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wasteType: {
    type: String,
    enum: ['recyclables', 'organic', 'general'],
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'missed'],
    default: 'scheduled',
  },
});

module.exports = mongoose.model('Pickup', PickupSchema);
