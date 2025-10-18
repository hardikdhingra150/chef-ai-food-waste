const supabase = require('../config/supabase');

exports.getFoodBanks = async (req, res, next) => {
  try {
    const foodBanks = [
      { id: 1, name: 'City Food Bank', address: '123 Main St', phone: '555-0101', distance: '0.8 mi', rating: 4.8 },
      { id: 2, name: 'Community Kitchen', address: '456 Oak Ave', phone: '555-0102', distance: '1.2 mi', rating: 4.9 },
      { id: 3, name: 'Hope Shelter', address: '789 Elm St', phone: '555-0103', distance: '2.1 mi', rating: 4.7 },
      { id: 4, name: 'Helping Hands', address: '321 Pine Rd', phone: '555-0104', distance: '3.5 mi', rating: 4.6 }
    ];

    res.json({ success: true, count: foodBanks.length, data: foodBanks });
  } catch (error) {
    next(error);
  }
};

exports.scheduleDonation = async (req, res, next) => {
  try {
    const { foodBank, items, scheduledPickup, notes } = req.body;

    if (!foodBank || !items || !scheduledPickup) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const estimatedMeals = items.reduce((sum, item) => sum + (item.quantity * 2), 0);

    const { data, error } = await supabase
      .from('donations')
      .insert([{
        user_id: req.user.id,
        food_bank: foodBank,
        items,
        estimated_meals: estimatedMeals,
        scheduled_pickup: scheduledPickup,
        notes
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getDonationHistory = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

exports.updateDonationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('donations')
      .update({ status })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
