const express = require('express');
const router = express.Router();
const { 
  getFoodBanks, 
  scheduleDonation, 
  getDonationHistory, 
  updateDonationStatus 
} = require('../controllers/donationController');

router.get('/', getFoodBanks);
router.post('/', scheduleDonation);
router.get('/history', getDonationHistory);
router.put('/:id/status', updateDonationStatus);

module.exports = router;
