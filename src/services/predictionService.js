import api from '../config/api';

export const predictionService = {
  // Get AI demand prediction
  getDemandPrediction: async () => {
    const { data } = await api.get('/predictions/demand');
    return data;
  },

  // Get prediction history
  getPredictionHistory: async () => {
    const { data } = await api.get('/predictions/history');
    return data;
  }
};
