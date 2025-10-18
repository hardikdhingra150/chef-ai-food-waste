import api from '../config/api';

export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
    const { data } = await api.get('/dashboard/stats');
    return data;
  }
};
