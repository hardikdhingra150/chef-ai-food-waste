const { getGeminiModel } = require('../config/gemini');

exports.generateRecipe = async (ingredients) => {
  const model = getGeminiModel();
  
  const prompt = `Create a recipe using: ${ingredients.join(', ')}. Return JSON with: name, ingredients, steps, time, servings.`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Recipe Generator Error:', error);
    return null;
  }
};
