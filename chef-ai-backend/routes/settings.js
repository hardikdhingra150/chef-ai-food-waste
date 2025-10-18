const express = require('express');
const router = express.Router();
const { 
  getSettings, 
  updateSettings, 
  updateNotifications, 
  updateBusinessHours 
} = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/', updateSettings);
router.put('/notifications', updateNotifications);
router.put('/business-hours', updateBusinessHours);

module.exports = router;
