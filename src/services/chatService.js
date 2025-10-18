import api from '../config/api';

export const sendMessage = async (message) => {
  try {
    console.log('📤 Sending message:', message);
    const response = await api.post('/chat/message', { message });
    console.log('📥 Message response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Chat error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const generateRecipe = async (ingredients) => {
  try {
    console.log('📤 Sending recipe request:', ingredients);
    const response = await api.post('/chat/recipe', { ingredients });
    console.log('📥 Recipe response:', response.data);
    
    // Check if response is valid
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || 'Invalid recipe response');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Recipe error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      ingredients: ingredients
    });
    throw error;
  }
};

export const chatService = {
  sendMessage,
  generateRecipe
};
