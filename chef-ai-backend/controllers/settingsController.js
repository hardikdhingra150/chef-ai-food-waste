const supabase = require('../config/supabase');

exports.getSettings = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, restaurant_name, owner_name, phone, address, cuisine, notifications, preferences, business_hours')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const updates = req.body;
    delete updates.email;
    delete updates.password_hash;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
};

exports.updateNotifications = async (req, res, next) => {
  try {
    const { notifications } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ notifications })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data: data.notifications });
  } catch (error) {
    next(error);
  }
};

exports.updateBusinessHours = async (req, res, next) => {
  try {
    const { businessHours } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ business_hours: businessHours })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data: data.business_hours });
  } catch (error) {
    next(error);
  }
};
