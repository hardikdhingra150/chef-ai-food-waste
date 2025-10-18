const express = require('express');
const router = express.Router();
const { 
  getWasteAnalytics, 
  getChartData, 
  getSavingsReport 
} = require('../controllers/analyticsController');

router.get('/waste', getWasteAnalytics);
router.get('/charts', getChartData);
router.get('/savings', getSavingsReport);

module.exports = router;
