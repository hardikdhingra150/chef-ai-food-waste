exports.calculateWasteTrend = (wasteLogs) => {
    const grouped = {};
    
    wasteLogs.forEach(log => {
      const date = log.created_at.split('T')[0];
      if (!grouped[date]) {
        grouped[date] = { date, waste: 0, cost: 0 };
      }
      grouped[date].waste += parseFloat(log.total_waste);
      grouped[date].cost += parseFloat(log.estimated_cost);
    });
    
    return Object.values(grouped);
  };
  
  exports.calculateCategoryBreakdown = (supplies) => {
    const breakdown = {};
    
    supplies.forEach(s => {
      if (!breakdown[s.category]) {
        breakdown[s.category] = { bought: 0, used: 0, wasted: 0 };
      }
      breakdown[s.category].bought += parseFloat(s.bought);
      breakdown[s.category].used += parseFloat(s.used);
      breakdown[s.category].wasted += parseFloat(s.bought - s.used);
    });
    
    return breakdown;
  };
  