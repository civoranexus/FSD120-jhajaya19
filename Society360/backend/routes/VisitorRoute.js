const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/AuthMiddleware');
const {
  createVisitor,
  getTodayVisitors,
  getAllVisitors,
  updateVisitorStatus,
} = require('../controllers/VisitorController');
const {approveVisitor, checkInVisitor} = require('../controllers/AdminController');

// All routes are protected
router.use(protect);

// Resident routes
router.post('/', createVisitor);
router.put('/:id/status', updateVisitorStatus);

// Staff/Admin routes
router.get('/today', getTodayVisitors);
router.get('/', getAllVisitors);

router.put('/admin/:id/approve', approveVisitor);
router.put('/admin/:id/checkin', checkInVisitor);

module.exports = router;