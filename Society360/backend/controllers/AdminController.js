const User = require('../models/User');
const Visitor = require('../models/Visitor');
const Maintenance = require('../models/Maintenance');
const Billing = require('../models/Billing');
const Unit = require('../models/Unit');
const Announcement = require('../models/Announcement');

// ======== DASHBOARD STATS ==========
const getDashboardStats = async (req, res) => {
  try {
    // Check admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    const [
      totalResidents,
      totalVisitorsToday,
      pendingMaintenance,
      pendingVisitors,
      pendingBills,
      totalUnits,
      occupiedUnits,
      monthlyRevenue
    ] = await Promise.all([
      User.countDocuments({ role: 'resident', isActive: true }),
      Visitor.countDocuments({ 
        expectedEntryTime: { 
          $gte: new Date().setHours(0,0,0,0),
          $lt: new Date().setHours(23,59,59,999)
        }
      }),
      Maintenance.countDocuments({ status: 'pending' }),
      Visitor.countDocuments({ status: 'pending' }),
      Billing.countDocuments({ status: 'pending' }),
      Unit.countDocuments(),
      Unit.countDocuments({ isOccupied: true }),
      Billing.aggregate([
        {
          $match: {
            status: 'paid',
            paidDate: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
            }
          }
        },
        { $group: { _id: null, total: { $sum: '$paidAmount' } } }
      ])
    ]);

    // Recent activities
    const recentMaintenance = await Maintenance.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'name unitId')
      .lean();

    const recentVisitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('residentId', 'name')
      .lean();

    res.json({
      success: true,
      data: {
        stats: {
          totalResidents,
          totalVisitorsToday,
          pendingMaintenance,
          pendingVisitors,
          pendingBills,
          totalUnits,
          occupiedUnits,
          occupancyRate: Math.round((occupiedUnits / totalUnits) * 100) || 0,
          monthlyRevenue: monthlyRevenue[0]?.total || 0
        },
        recentActivities: {
          maintenance: recentMaintenance,
          visitors: recentVisitors
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ======== USER MANAGEMENT ========= 
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const users = await User.find()
      .select('-password')
      .populate('unitId', 'unitNumber building')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { name, email, password, phone, role, unitId } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: password || 'password123', // In production, generate random password
      phone,
      role: role || 'resident',
      unitId,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const updates = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString() && updates.role !== 'admin') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot change your own admin role' 
      });
    }

    Object.keys(updates).forEach(key => {
      user[key] = updates[key];
    });

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete your own account' 
      });
    }

    await user.deleteOne();

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== MAINTENANCE MANAGEMENT ===========
const getAllMaintenance = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { status, priority } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const maintenance = await Maintenance.find(filter)
      .populate('userId', 'name unitId phone')
      .sort({ priority: -1, createdAt: -1 });

    res.json({ success: true, count: maintenance.length, data: maintenance });
  } catch (error) {
    console.error('Get maintenance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateMaintenanceStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { status, priority, adminNotes, actualCost } = req.body;
    const maintenance = await Maintenance.findById(req.params.id);
    
    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance not found' });
    }

    // Update fields
    if (status) {
      maintenance.status = status;
      if (status === 'completed') {
        maintenance.completedAt = new Date();
      }
    }
    if (priority) maintenance.priority = priority;
    if (adminNotes) maintenance.adminNotes = adminNotes;
    if (actualCost) maintenance.actualCost = actualCost;

    await maintenance.save();

    res.json({
      success: true,
      message: 'Maintenance updated successfully',
      data: maintenance
    });
  } catch (error) {
    console.error('Update maintenance error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== VISITOR MANAGEMENT ============
const getAllVisitors = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { status, date } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.expectedEntryTime = { $gte: startDate, $lte: endDate };
    }

    const visitors = await Visitor.find(filter)
      .populate('residentId', 'name unitId phone')
      .sort({ expectedEntryTime: -1 });

    res.json({ success: true, count: visitors.length, data: visitors });
  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const approveVisitor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({ success: false, message: 'Visitor not found' });
    }

    visitor.status = 'approved';
    visitor.approvedByAdminId = req.user._id;
    visitor.approvedAt = new Date();

    await visitor.save();

    res.json({
      success: true,
      message: 'Visitor approved successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Approve visitor error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const rejectVisitor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({ success: false, message: 'Visitor not found' });
    }

    visitor.status = 'rejected';
    visitor.adminNotes = req.body.reason || 'Rejected by admin';

    await visitor.save();

    res.json({
      success: true,
      message: 'Visitor rejected',
      data: visitor
    });
  } catch (error) {
    console.error('Reject visitor error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const checkInVisitor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({ success: false, message: 'Visitor not found' });
    }

    if (visitor.status !== 'approved') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only approved visitors can be checked in' 
      });
    }

    visitor.status = 'checked_in';
    visitor.checkedInBy = req.user._id;
    visitor.actualEntryTime = new Date();

    await visitor.save();

    res.json({
      success: true,
      message: 'Visitor checked in successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Check in visitor error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const checkOutVisitor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({ success: false, message: 'Visitor not found' });
    }

    if (visitor.status !== 'checked_in') {
      return res.status(400).json({ 
        success: false, 
        message: 'Visitor is not checked in' 
      });
    }

    visitor.status = 'checked_out';
    visitor.checkedOutBy = req.user._id;
    visitor.actualExitTime = new Date();

    await visitor.save();

    res.json({
      success: true,
      message: 'Visitor checked out successfully',
      data: visitor
    });
  } catch (error) {
    console.error('Check out visitor error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// =========== UNIT MANAGEMENT ===========
const getAllUnits = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const units = await Unit.find()
      .populate('currentResident', 'name email phone')
      .sort({ building: 1, floor: 1, unitNumber: 1 });

    res.json({ success: true, count: units.length, data: units });
  } catch (error) {
    console.error('Get units error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createUnit = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const unit = await Unit.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Unit created successfully',
      data: unit
    });
  } catch (error) {
    console.error('Create unit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ============ ANNOUNCEMENT MANAGEMENT =============
const createAnnouncement = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const announcement = await Announcement.create({
      ...req.body,
      postedBy: req.user._id,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: announcements
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// =========== BILLING MANAGEMENT ===========
const getAllBilling = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { status } = req.query;
    const filter = {};
    
    if (status) filter.status = status;

    const bills = await Billing.find(filter)
      .populate('userId', 'name email phone')
      .populate('unitId', 'unitNumber building')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bills.length, data: bills });
  } catch (error) {
    console.error('Get billing error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const generateBills = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { month, year, amount, description } = req.body;
    
    // Get all active residents
    const residents = await User.find({ 
      role: 'resident', 
      isActive: true,
      unitId: { $ne: null }
    });

    // Create bills for each resident
    const bills = [];
    for (const resident of residents) {
      const bill = await Billing.create({
        userId: resident._id,
        unitId: resident.unitId,
        amount,
        dueDate: new Date(year, month, 10), // 10th of the month
        description: description || `Maintenance charges for ${month}/${year}`,
        status: 'pending'
      });
      bills.push(bill);
    }

    res.status(201).json({
      success: true,
      message: `Bills generated for ${bills.length} residents`,
      data: bills
    });
  } catch (error) {
    console.error('Generate bills error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  // Dashboard
  getDashboardStats,
  
  // User Management
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  
  // Maintenance Management
  getAllMaintenance,
  updateMaintenanceStatus,
  
  // Visitor Management
  getAllVisitors,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
  
  // Unit Management
  getAllUnits,
  createUnit,
  
  // Announcement Management
  createAnnouncement,
  getAnnouncements,
  
  // Billing Management
  getAllBilling,
  generateBills
};