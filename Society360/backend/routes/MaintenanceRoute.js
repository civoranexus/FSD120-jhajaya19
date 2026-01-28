const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/AuthMiddleware');
const {
  createMaintenance,
  getAllMaintenance,
  updateMaintenance,
} = require('../controllers/MaintenanceController');

router.use(protect);

// Resident routes
router.post('/', createMaintenance);
// router.get('/my-requests', getMyMaintenance);
// router.post('/:id/feedback', addFeedback);

// Staff/Admin routes
router.get('/', getAllMaintenance);
// router.get('/stats', getMaintenanceStats);
router.put('/:id', updateMaintenance);

// Common routes
// router.get('/:id', getMaintenance);

module.exports = router;