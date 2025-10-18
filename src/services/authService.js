import api from '../config/api';

export const authService = {
  // Register new user
  register: async (email, password, restaurantName, ownerName) => {
    const { data } = await api.post('/auth/register', {
      email,
      password,
      restaurantName,
      ownerName
    });
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data;
  },

  // Login user
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    return data;
  },

  // Get current user
  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
