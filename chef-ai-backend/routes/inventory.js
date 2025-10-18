const express = require('express');
const router = express.Router();
const { 
  getSupplies, 
  addSupply, 
  updateSupply, 
  deleteSupply, 
  getExpiringItems 
} = require('../controllers/inventoryController');

// Remove protect middleware for now (add back later)
// const { protect } = require('../middleware/auth');
router.get('/expiring', getExpiringItems);
router.get('/', getSupplies);
router.post('/', addSupply);
router.put('/:id', updateSupply);
router.delete('/:id', deleteSupply);

module.exports = router;
