const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  
  building: {
    type: String,
    required: true
  },
  
  floor: {
    type: Number,
    required: true
  },
  
  unitType: {
    type: String,
    enum: ['1BHK', '2BHK', '3BHK', 'studio'],
    default: '2BHK'
  },
  
  area: Number,
  
  currentResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  ownerName: String,
  
  isOccupied: {
    type: Boolean,
    default: true
  },
  
  parkingSlots: [String] 
  
}, { timestamps: true });

module.exports = mongoose.model('Unit', unitSchema);