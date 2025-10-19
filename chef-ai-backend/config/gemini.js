const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// ✅ Load API key from environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment variables');
  throw new Error('Missing GEMINI_API_KEY');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

console.log('✅ Gemini 2.5 Flash loaded');

module.exports = { getGeminiModel };
