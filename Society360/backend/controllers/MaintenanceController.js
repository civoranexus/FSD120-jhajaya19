const Maintenance = require('../models/Maintenance');

const createMaintenance = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    
    const createdBy = req.user._id;
    const unitId = req.user.unitId;

    if (!unitId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User not assigned to any unit' 
      });
    }

    const maintenance = await Maintenance.create({
      title,
      description,
      category: category || 'other',
      priority: priority || 'medium',
      status: 'pending',
      userId: createdBy,
      unitId,
    });

    res.status(201).json({
      success: true,
      message: 'Maintenance request created successfully',
      data: maintenance
    });
  } catch (error) {
    console.error('Create maintenance error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

const getAllMaintenance = async (req, res) => {
  try {
    const { status, priority, category } = req.query;
    const filter = {};

    // If not staff/admin, only show requests from their unit
    if (!['staff', 'admin'].includes(req.user.role)) {
      filter.unitId = req.user.unitId;
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const maintenance = await Maintenance.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .populate('userId', 'name unitId phone')
      .populate('assignedTo', 'name email');

    res.json({
      success: true,
      count: maintenance.length,
      data: maintenance
    });
  } catch (error) {
    console.error('Get all maintenance error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// // @desc    Get single maintenance request
// // @route   GET /api/maintenance/:id
// const getMaintenance = async (req, res) => {
//   try {
//     const maintenance = await Maintenance.findById(req.params.id)
//       .populate('createdBy', 'name unitId phone')
//       .populate('assignedTo', 'name email phone');

//     if (!maintenance) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Maintenance request not found' 
//       });
//     }

//     // Check authorization (resident can only see their own requests)
//     if (req.user.role === 'resident' && 
//         maintenance.createdBy._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Not authorized' 
//       });
//     }

//     res.json({
//       success: true,
//       data: maintenance
//     });
//   } catch (error) {
//     console.error('Get maintenance error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

const updateMaintenance = async (req, res) => {
  try {
    // Only staff/admin can update
    if (!['staff', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const { status, assignedTo, actualCost } = req.body;
    
    const maintenance = await Maintenance.findById(req.params.id);
    
    if (!maintenance) {
      return res.status(404).json({ 
        success: false, 
        message: 'Maintenance request not found' 
      });
    }

    if (status) maintenance.status = status;
    if (assignedTo) {
      maintenance.assignedTo = assignedTo;
      maintenance.assignedAt = new Date();
    }
    if (actualCost) maintenance.actualCost = actualCost;

    if (status === 'completed' && maintenance.status !== 'completed') {
      maintenance.completedAt = new Date();
    }

    await maintenance.save();

    res.json({
      success: true,
      message: 'Maintenance request updated successfully',
      data: maintenance
    });
  } catch (error) {
    console.error('Update maintenance error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// const addFeedback = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
    
//     const maintenance = await Maintenance.findById(req.params.id);
    
//     if (!maintenance) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Maintenance request not found' 
//       });
//     }

//     if (maintenance.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Not authorized' 
//       });
//     }

//     // Check if request is completed
//     if (maintenance.status !== 'completed') {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Can only add feedback to completed requests' 
//       });
//     }

//     maintenance.feedback = {
//       rating,
//       comment
//     };

//     await maintenance.save();

//     res.json({
//       success: true,
//       message: 'Feedback added successfully',
//       data: maintenance
//     });
//   } catch (error) {
//     console.error('Add feedback error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

// // @desc    Get maintenance statistics
// // @route   GET /api/maintenance/stats
// const getMaintenanceStats = async (req, res) => {
//   try {
//     const stats = await Maintenance.aggregate([
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 },
//           avgEstimatedCost: { $avg: '$estimatedCost' }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: '$count' },
//           statusCounts: {
//             $push: {
//               status: '$_id',
//               count: '$count'
//             }
//           },
//           avgCost: { $avg: '$avgEstimatedCost' }
//         }
//       }
//     ]);

//     const priorityStats = await Maintenance.aggregate([
//       {
//         $group: {
//           _id: '$priority',
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       data: {
//         ...stats[0],
//         priorityStats
//       }
//     });
//   } catch (error) {
//     console.error('Get stats error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

module.exports = {
  createMaintenance,
  getAllMaintenance,
  updateMaintenance,
};