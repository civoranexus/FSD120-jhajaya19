const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/AuthMiddleware');
const {
  getDashboardStats,
  
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  
  getAllMaintenance,
  updateMaintenanceStatus,
  
  getAllVisitors,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
  
  getAllUnits,
  createUnit,
  
  createAnnouncement,
  
  generateBills
} = require('../controllers/AdminController');


router.use(protect);

// ======= DASHBOARD ========
router.get('/dashboard/stats', getDashboardStats);

// ====== USER MANAGEMENT =======
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// ========== MAINTENANCE MANAGEMENT ========
router.get('/maintenance', getAllMaintenance);
router.put('/maintenance/:id/status', updateMaintenanceStatus);

// ======== VISITOR MANAGEMENT =========
router.get('/visitors', getAllVisitors);
router.put('/visitors/:id/approve', approveVisitor);
router.put('/visitors/:id/reject', rejectVisitor);
router.put('/visitors/:id/checkin', checkInVisitor);
router.put('/visitors/:id/checkout', checkOutVisitor);

// ======== UNIT MANAGEMENT ========
router.get('/units', getAllUnits);
router.post('/units', createUnit);

// ======= ANNOUNCEMENT MANAGEMENT =======
router.post('/announcements', createAnnouncement);

// ========= BILLING MANAGEMENT ========
router.post('/bills/generate', generateBills);

module.exports = router;