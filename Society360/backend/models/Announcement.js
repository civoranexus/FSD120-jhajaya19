const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  
  content: {
    type: String,
    required: true
  },
  
  category: {
    type: String,
    enum: ['general', 'maintenance', 'event', 'emergency', 'payment', 'meeting'],
    default: 'general'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  targetUnits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  }],
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  eventDate: {
    type: Date
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

module.exports = mongoose.model('Announcement', announcementSchema);