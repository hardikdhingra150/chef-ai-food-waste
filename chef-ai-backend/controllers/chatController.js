const { getGeminiModel } = require('../config/gemini');

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    console.log('🤖 Gemini API called with message:', message);

    // Get Gemini model
    const model = getGeminiModel();

    // Create context-aware prompt
    const systemPrompt = `You are a helpful AI assistant for CHEF AI, a food waste management system for restaurants. 
You help restaurant owners with:
- Inventory management
- Waste reduction strategies
- Recipe suggestions using surplus ingredients
- Demand predictions
- Food donation guidance

User question: ${message}

Provide a helpful, concise, and friendly response (2-3 sentences max).`;

    // Call Gemini
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini response:', text);

    res.json({
      success: true,
      data: {
        message: text,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // Fallback response if Gemini fails
    res.json({
      success: true,
      data: {
        message: "I'm here to help with your food waste management! I can assist with inventory tracking, waste reduction tips, recipe suggestions, and predictions. What would you like to know?",
        timestamp: new Date().toISOString(),
        fallback: true
      }
    });
  }
};
