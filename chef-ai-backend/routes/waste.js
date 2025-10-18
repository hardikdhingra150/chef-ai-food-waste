const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const GEMINI_API_KEY = 'AIzaSyDmr-c93g34qChyaJUxW0MTaqWyO9CPI1M';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `waste-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP allowed.'));
    }
  }
});

// Food price database (₹ per kg)
const FOOD_PRICES = {
  'apple': 120, 'banana': 40, 'tomato': 60, 'potato': 30,
  'onion': 50, 'carrot': 50, 'cabbage': 30, 'lettuce': 80,
  'milk': 60, 'bread': 40, 'rice': 50, 'chicken': 180,
  'fish': 200, 'egg': 6, 'cheese': 400, 'yogurt': 80,
  'paneer': 300, 'dal': 100, 'wheat': 40, 'sugar': 50
};

// Waste scan endpoint
router.post('/scan', upload.single('image'), async (req, res) => {
  console.log('📸 Waste scan request');
  
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    console.log('📸 Image uploaded:', req.file.filename);

    // Use gemini-1.5-flash for vision (NOT 2.5!)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Read image file
    const imageBuffer = fs.readFileSync(req.file.path);
    const imageBase64 = imageBuffer.toString('base64');

    const prompt = `Analyze this food waste image and identify ALL visible food items with accurate quantities.

Instructions:
- Identify each food item visible in the image
- Estimate the weight/quantity for each item
- Determine the condition (fresh, spoiled, or expired)
- Provide actionable suggestions to reduce waste

Return ONLY valid JSON in this format:
{
  "items": [
    {"name": "item name", "quantity": "weight in kg or pieces", "condition": "fresh/spoiled/expired"}
  ],
  "totalWeight": "total weight in kg",
  "suggestions": ["specific suggestion 1", "specific suggestion 2"]
}`;

    console.log('🤖 Calling Gemini Vision API...');

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
    console.log('📥 Raw response:', text.substring(0, 200));

    // Extract JSON
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) {
      throw new Error('No JSON found in response');
    }
    
    const jsonStr = text.substring(start, end + 1);
    const analysis = JSON.parse(jsonStr);

    // Calculate total cost
    let totalCost = 0;
    if (analysis.items && Array.isArray(analysis.items)) {
      analysis.items.forEach(item => {
        const itemName = item.name.toLowerCase();
        const basePrice = FOOD_PRICES[itemName] || 50;
        
        // Extract numeric value from quantity
        const quantityMatch = item.quantity.match(/[\d.]+/);
        const weight = quantityMatch ? parseFloat(quantityMatch[0]) : 0.5;
        
        totalCost += basePrice * weight;
      });
    }

    // Format response
    const response = {
      items: analysis.items || [],
      totalWeight: analysis.totalWeight || '0 kg',
      totalCost: Math.round(totalCost),
      suggestions: analysis.suggestions || ['Donate to food banks', 'Compost organic waste'],
      timestamp: new Date().toISOString(),
      imageUrl: `/uploads/${req.file.filename}`
    };

    console.log('✅ Detected:', response.items.length, 'items, Cost: ₹' + response.totalCost);
    
    res.json({ success: true, data: response });

  } catch (error) {
    console.error('❌ Waste scan error:', error.message);
    
    // Clean up uploaded file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to analyze image' 
    });
  }
});

module.exports = router;
