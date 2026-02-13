const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
    trim: true
  },
  
  visitorPhone: {
    type: String,
    required: true
  },
  
  purpose: {
    type: String,
    required: true,
    enum: ['personal', 'delivery', 'service', 'guest'],
    default: 'personal'
  },
  
  expectedEntryTime: {
    type: Date,
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'checked_in', 'checked_out'],
    default: 'pending'
  },

  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  unitId: {
    type: String,
    required: true
  },
  
  actualEntryTime: Date,
  actualExitTime: Date,
  
  notes: String
  
}, { timestamps: true });

module.exports = mongoose.model('Visitor', visitorSchema);