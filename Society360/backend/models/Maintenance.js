const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  
  category: { 
    type: String, 
    enum: ['plumbing', 'electrical', 'carpentry', 'other'],
    default: 'other'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed'],
    default: 'pending'
  },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

maintenanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);