const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = 'AIzaSyDmr-c93g34qChyaJUxW0MTaqWyO9CPI1M';

console.log('🧪 Testing Gemini API Key...\n');

async function testGemini() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('1️⃣ Initializing Gemini...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('✅ Model initialized\n');
    
    console.log('2️⃣ Sending test message...');
    const result = await model.generateContent('Say hello in one word');
    const response = result.response.text();
    
    console.log('✅ Response received:', response);
    console.log('\n🎉 SUCCESS! Your API key is working perfectly!\n');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n🔴 Your API key is INVALID or EXPIRED');
      console.log('👉 Get a new key: https://aistudio.google.com/app/apikey\n');
    } else if (error.message.includes('404')) {
      console.log('\n🔴 Model "gemini-2.5-flash" not available for your key');
      console.log('👉 Try "gemini-1.5-flash" instead\n');
    } else {
      console.log('\n🔴 Something went wrong:', error.message);
    }
  }
}

testGemini();
