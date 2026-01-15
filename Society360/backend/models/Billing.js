const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },

  billType: {
    type: String,
    enum: ['maintenance', 'water', 'electricity', 'parking', 'other'],
    default: 'maintenance'
  },
  
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  
  dueDate: {
    type: Date,
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'cancelled'],
    default: 'pending'
  },
  
  paidDate: {
    type: Date
  },
  
  transactionId: {
    type: String 
  },

  description: {
    type: String,
    default: 'Monthly maintenance charges'
  },
  
  periodMonth: {
    type: String,
    enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  
  periodYear: {
    type: Number,
    default: new Date().getFullYear()
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Billing', billingSchema);