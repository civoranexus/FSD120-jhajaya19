const Visitor = require('../models/Visitor');
const createVisitor = async (req, res) => {
  try {
    const { visitorName, visitorPhone, purpose, expectedEntryTime } = req.body;

    const userId = req.user._id;
    const userUnitId = req.user.unitId; 
    
    if (!userUnitId) {
      return res.status(400).json({ message: 'User is not assigned to any unit' });
    }

    const visitor = await Visitor.create({
      visitorName,
      visitorPhone,
      purpose: purpose || 'personal',
      expectedEntryTime: new Date(expectedEntryTime),
      residentId: userId,
      unitId: userUnitId,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Visitor request created successfully',
      visitor
    });
  } catch (error) {
    console.error('Create visitor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodayVisitors = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const visitors = await Visitor.find({
      expectedEntryTime: {
        $gte: today,
        $lt: tomorrow
      }
    })
    .sort({ expectedEntryTime: 1 })
    .populate('residentId', 'name unitNumber')
    .populate('unitId', 'unitNumber building');

    res.json({
      count: visitors.length,
      visitors
    });
  } catch (error) {
    console.error('Get today visitors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Update visitor status (approve/reject)
const updateVisitorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const visitorId = req.params.id;
    const userId = req.user._id;

    const visitor = await Visitor.findById(visitorId);
    
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    // Check if visitor belongs to this resident
    if (visitor.residentId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this visitor' });
    }

    // Update status
    if (status === 'approved') {
      await visitor.approve(userId);
    } else if (status === 'rejected') {
      await visitor.reject(userId);
    } else {
      visitor.status = status;
      await visitor.save();
    }

    res.json({
      message: `Visitor ${status} successfully`,
      visitor
    });
  } catch (error) {
    console.error('Update visitor status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createVisitor,
  getTodayVisitors,
  updateVisitorStatus
};