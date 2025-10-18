const supabase = require('../config/supabase');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { email, password, restaurantName, ownerName, phone } = req.body;

    // Validate input
    if (!email || !password || !restaurantName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and restaurant name'
      });
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          restaurant_name: restaurantName,
          owner_name: ownerName,
          phone
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        restaurantName: user.restaurant_name,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        restaurantName: user.restaurant_name,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, restaurant_name, owner_name, phone, address, cuisine, notifications, preferences, business_hours')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
