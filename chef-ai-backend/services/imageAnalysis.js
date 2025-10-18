const { getGeminiVisionModel } = require('../config/gemini');

exports.analyzeWasteImage = async (base64Image, mimeType) => {
  const model = getGeminiVisionModel();
  
  const prompt = `Analyze this food waste image. Return JSON with: items, totalWaste (kg), estimatedCost (USD), recommendation.`;
  
  try {
    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType, data: base64Image } }
    ]);
    
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Image Analysis Error:', error);
    return null;
  }
};
