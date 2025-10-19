import axios from 'axios';

// ✅ Use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Add /api to the base URL
const API_URL = `${API_BASE_URL}/api`;

// Debug log (will show in browser console)
console.log('🔧 API Base URL:', API_BASE_URL);
console.log('🔧 Full API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
