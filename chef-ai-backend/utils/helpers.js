const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.calculateWastePercent = (bought, used) => {
  return ((bought - used) / bought * 100).toFixed(1);
};

exports.isLowStock = (bought, used, threshold = 0.2) => {
  return (bought - used) < (bought * threshold);
};

exports.calculateDaysUntilExpiry = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
