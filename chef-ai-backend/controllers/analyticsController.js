const supabase = require('../config/supabase');

exports.getWasteAnalytics = async (req, res, next) => {
  try {
    const { data: wasteLogs, error } = await supabase
      .from('waste_logs')
      .select('total_waste, estimated_cost, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    const totalWaste = wasteLogs.reduce((sum, log) => sum + parseFloat(log.total_waste), 0);
    const totalCost = wasteLogs.reduce((sum, log) => sum + parseFloat(log.estimated_cost), 0);
    const co2Saved = totalWaste * 2.5;

    res.json({
      success: true,
      data: {
        totalWaste: totalWaste.toFixed(2),
        totalCost: totalCost.toFixed(2),
        co2Saved: co2Saved.toFixed(2),
        logs: wasteLogs
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getChartData = async (req, res, next) => {
  try {
    const { data: supplies } = await supabase
      .from('supplies')
      .select('category, bought, used')
      .eq('user_id', req.user.id);

    const categoryData = {};
    supplies.forEach(s => {
      if (!categoryData[s.category]) {
        categoryData[s.category] = { total: 0, wasted: 0 };
      }
      categoryData[s.category].total += parseFloat(s.bought);
      categoryData[s.category].wasted += parseFloat(s.bought - s.used);
    });

    const chartData = Object.keys(categoryData).map(cat => ({
      category: cat,
      total: categoryData[cat].total,
      wasted: categoryData[cat].wasted
    }));

    res.json({ success: true, data: chartData });
  } catch (error) {
    next(error);
  }
};

exports.getSavingsReport = async (req, res, next) => {
  try {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    
    const { data: wasteLogs } = await supabase
      .from('waste_logs')
      .select('estimated_cost')
      .eq('user_id', req.user.id)
      .gte('created_at', startOfMonth.toISOString());

    const { data: donations } = await supabase
      .from('donations')
      .select('estimated_meals')
      .eq('user_id', req.user.id)
      .gte('created_at', startOfMonth.toISOString());

    const wasteReduced = wasteLogs.reduce((sum, log) => sum + parseFloat(log.estimated_cost), 0);
    const mealsDonated = donations.reduce((sum, d) => sum + d.estimated_meals, 0);
    const totalSavings = wasteReduced + (mealsDonated * 8.50);

    res.json({
      success: true,
      data: {
        wasteReduced: wasteReduced.toFixed(2),
        mealsDonated,
        totalSavings: totalSavings.toFixed(2),
        projectedAnnual: (totalSavings * 12).toFixed(2)
      }
    });
  } catch (error) {
    next(error);
  }
};
