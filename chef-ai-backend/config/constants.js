module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  LOW_STOCK_THRESHOLD: 0.2,
  EXPIRY_WARNING_DAYS: 3,
  AVG_MEAL_COST: 8.50,
  CO2_PER_KG_FOOD: 2.5,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png']
};
