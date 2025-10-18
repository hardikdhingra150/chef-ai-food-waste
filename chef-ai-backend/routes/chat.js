const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = 'AIzaSyDmr-c93g34qChyaJUxW0MTaqWyO9CPI1M';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const MODEL_NAME = 'gemini-2.5-flash';

router.post('/message', async (req, res) => {
  console.log('💬 Chat');
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message required' });
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(`You are CHEF AI. Answer: ${message}`);
    res.json({ success: true, data: { message: result.response.text(), timestamp: new Date().toISOString() }});
  } catch (error) {
    console.error('❌', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/recipe', async (req, res) => {
  console.log('🍳 Recipe');
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ success: false, message: 'Need ingredients' });
    }
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Create Indian recipe with ${ingredients.join(', ')}. Return pure JSON only:\n{"name":"Name","servings":"4","time":"30min","difficulty":"Easy","savings":"₹400","steps":["a","b","c","d","e"],"tips":"tip"}`;
    
    const result = await model.generateContent(prompt);
    let raw = result.response.text().trim();
    
    console.log('Raw:', raw.substring(0, 100));
    
    // Extract JSON
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON');
    
    const jsonStr = raw.substring(start, end + 1);
    const recipe = JSON.parse(jsonStr);
    
    if (!recipe.name || !recipe.steps) throw new Error('Bad format');
    
    console.log('✅', recipe.name);
    res.json({ success: true, data: recipe });
  } catch (error) {
    console.error('❌', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
