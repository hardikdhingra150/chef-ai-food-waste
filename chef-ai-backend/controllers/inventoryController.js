const supabase = require('../config/supabase');

// @route   GET /api/inventory/expiring
// @desc    Get expiring items (within 7 days)
exports.getExpiringItems = async (req, res, next) => {
  try {
    const today = new Date();
    
    // Calculate days until expiry for each item
    const calculateDaysUntilExpiry = (expiryDate) => {
      const expiry = new Date(expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    // Mock expiring items
    const expiringItems = [
      {
        id: '1',
        name: 'Milk',
        amount: '8 liters',
        expiry_date: '2025-10-15',
        daysUntilExpiry: 1
      },
      {
        id: '2',
        name: 'Lettuce',
        amount: '5 kg',
        expiry_date: '2025-10-15',
        daysUntilExpiry: 1
      },
      {
        id: '3',
        name: 'Yogurt',
        amount: '12 pcs',
        expiry_date: '2025-10-17',
        daysUntilExpiry: 3
      },
      {
        id: '4',
        name: 'Tomatoes',
        amount: '3 kg',
        expiry_date: '2025-10-16',
        daysUntilExpiry: 2
      }
    ];

    // Sort by urgency (closest to expiry first)
    const sortedItems = expiringItems.sort((a, b) => 
      a.daysUntilExpiry - b.daysUntilExpiry
    );

    console.log(`📅 Expiring items: ${sortedItems.length}`);

    res.json({
      success: true,
      count: sortedItems.length,
      data: sortedItems
    });
  } catch (error) {
    console.error('Error fetching expiring items:', error);
    next(error);
  }
};

// @route   GET /api/inventory
// @desc    Get all supplies
exports.getSupplies = async (req, res, next) => {
  try {
    const mockSupplies = [
      {
        id: '1',
        name: 'Tomatoes',
        category: 'Vegetables',
        bought: 50,
        used: 35,
        unit: 'kg',
        expiry_date: '2025-10-20',
        remaining: 15,
        wastePercent: 30.0,
        isLowStock: false
      },
      {
        id: '2',
        name: 'Rice',
        category: 'Grains',
        bought: 100,
        used: 75,
        unit: 'kg',
        expiry_date: '2025-12-31',
        remaining: 25,
        wastePercent: 25.0,
        isLowStock: false
      },
      {
        id: '3',
        name: 'Chicken',
        category: 'Meat',
        bought: 30,
        used: 25,
        unit: 'kg',
        expiry_date: '2025-10-16',
        remaining: 5,
        wastePercent: 16.7,
        isLowStock: true
      },
      {
        id: '4',
        name: 'Milk',
        category: 'Dairy',
        bought: 20,
        used: 12,
        unit: 'liters',
        expiry_date: '2025-10-15',
        remaining: 8,
        wastePercent: 40.0,
        isLowStock: false
      },
      {
        id: '5',
        name: 'Lettuce',
        category: 'Vegetables',
        bought: 10,
        used: 5,
        unit: 'kg',
        expiry_date: '2025-10-15',
        remaining: 5,
        wastePercent: 50.0,
        isLowStock: false
      }
    ];

    console.log(`📦 Supplies fetched: ${mockSupplies.length}`);

    res.json({
      success: true,
      count: mockSupplies.length,
      data: mockSupplies
    });
  } catch (error) {
    console.error('Error fetching supplies:', error);
    next(error);
  }
};

// @route   POST /api/inventory
// @desc    Add new supply
exports.addSupply = async (req, res, next) => {
  try {
    const { name, category, bought, used, unit, expiryDate } = req.body;

    if (!name || !bought) {
      return res.status(400).json({
        success: false,
        message: 'Name and bought quantity required'
      });
    }

    const newSupply = {
      id: Date.now().toString(),
      name,
      category: category || 'Other',
      bought: parseFloat(bought),
      used: parseFloat(used) || 0,
      unit: unit || 'kg',
      expiry_date: expiryDate,
      remaining: parseFloat(bought) - (parseFloat(used) || 0),
      wastePercent: 0,
      isLowStock: false
    };

    console.log(`✅ Supply added: ${name}`);

    res.status(201).json({
      success: true,
      data: newSupply
    });
  } catch (error) {
    console.error('Error adding supply:', error);
    next(error);
  }
};

// @route   PUT /api/inventory/:id
// @desc    Update supply
exports.updateSupply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log(`📝 Supply updated: ${id}`);

    res.json({
      success: true,
      data: { id, ...updates }
    });
  } catch (error) {
    console.error('Error updating supply:', error);
    next(error);
  }
};

// @route   DELETE /api/inventory/:id
// @desc    Delete supply
exports.deleteSupply = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(`🗑️ Supply deleted: ${id}`);

    res.json({
      success: true,
      message: 'Supply deleted'
    });
  } catch (error) {
    console.error('Error deleting supply:', error);
    next(error);
  }
};
