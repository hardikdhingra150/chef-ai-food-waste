const express = require('express');
const router = express.Router();
const { getDemandPrediction, getPredictionHistory } = require('../controllers/predictionController');

router.get('/demand', getDemandPrediction);
router.get('/history', getPredictionHistory);

module.exports = router;
