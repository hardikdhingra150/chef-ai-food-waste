const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = 'AIzaSyDmr-c93g34qChyaJUxW0MTaqWyO9CPI1M';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });  // ← CHANGED
};

console.log('✅ Gemini 2.5 Flash loaded');  // ← CHANGED

module.exports = { getGeminiModel };
