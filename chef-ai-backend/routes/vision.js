const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');

const GEMINI_API_KEY = 'AIzaSyDmr-c93g34qChyaJUxW0MTaqWyO9CPI1M';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Food price database (per kg)
const FOOD_PRICES = {
  'apple': 120, 'banana': 40, 'tomato': 60, 'potato': 30,
  'onion': 50, 'carrot': 50, 'cabbage': 30, 'lettuce': 80,
  'milk': 60, 'bread': 40, 'rice': 50, 'chicken': 180,
  'fish': 200, 'egg': 6, 'cheese': 400, 'yogurt': 80
};

router.post('/scan', upload.single('image'), async (req, res) => {
  console.log('📸 Waste scan request');
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert buffer to base64
    const imageBase64 = req.file.buffer.toString('base64');
    
    const prompt = `Analyze this food waste image and identify ALL food items visible.
For each item, estimate the quantity/weight.

Return ONLY valid JSON:
{
  "items": [
    {"name": "item name", "quantity": "estimated weight", "condition": "fresh/spoiled/expired"}
  ],
  "totalWeight": "estimated total in kg",
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageBase64
        }
      }
    ]);

    let text = result.response.text().trim();
    console.log('Raw response:', text.substring(0, 200));

    // Extract JSON
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON in response');
    
    const jsonStr = text.substring(start, end + 1);
    const analysis = JSON.parse(jsonStr);

    // Calculate cost
    let totalCost = 0;
    analysis.items.forEach(item => {
      const basePrice = FOOD_PRICES[item.name.toLowerCase()] || 50;
      const weight = parseFloat(analysis.totalWeight) / analysis.items.length;
      totalCost += basePrice * weight;
    });

    // Add calculated data
    analysis.totalCost = Math.round(totalCost);
    analysis.timestamp = new Date().toISOString();

    console.log('✅ Detected:', analysis.items.length, 'items');
    
    res.json({ success: true, data: analysis });

  } catch (error) {
    console.error('❌ Vision error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
