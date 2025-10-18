const supabase = require('../config/supabase');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
exports.getStats = async (req, res, next) => {
  try {
    // Return mock stats for testing
    const stats = {
      predictedCovers: 340,
      wastePrevented: '45 lbs',
      surplusItems: 18,
      mealsDonated: 127
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
