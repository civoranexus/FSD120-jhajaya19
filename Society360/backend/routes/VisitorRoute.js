const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/AuthMiddleware');
const {
  createVisitor,
  getTodayVisitors,
  getAllVisitors,
  updateVisitorStatus
} = require('../controllers/VisitorController');

// All routes are protected
router.use(protect);

// Resident routes
router.post('/', createVisitor);
router.put('/:id/status', updateVisitorStatus);

// Staff/Admin routes
router.get('/today', getTodayVisitors);
router.get('/', getAllVisitors);

module.exports = router;