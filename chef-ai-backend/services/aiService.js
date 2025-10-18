const { getGeminiModel } = require('../config/gemini');

exports.generatePrediction = async (data) => {
  const model = getGeminiModel();
  const prompt = `Based on restaurant data, predict demand. Respond with JSON only.`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('AI Service Error:', error);
    return null;
  }
};
