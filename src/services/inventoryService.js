import api from '../config/api';

export const inventoryService = {
  // Get all supplies
  getSupplies: async () => {
    const { data } = await api.get('/inventory');
    return data;
  },

  // Add new supply
  addSupply: async (supply) => {
    const { data } = await api.post('/inventory', supply);
    return data;
  },

  // Update supply
  updateSupply: async (id, updates) => {
    const { data } = await api.put(`/inventory/${id}`, updates);
    return data;
  },

  // Delete supply
  deleteSupply: async (id) => {
    const { data } = await api.delete(`/inventory/${id}`);
    return data;
  },

  // Get expiring items
  getExpiringItems: async () => {
    const { data } = await api.get('/inventory/expiring');
    return data;
  }
};
