import api from './api';

const learningPathService = {
  generate: async (data) => {
    const response = await api.post('/learning-paths/generate', data);
    return response.data;
  },
  getAll: async (params = {}) => {
    const response = await api.get('/learning-paths', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/learning-paths/${id}`);
    return response.data;
  },
  getRecommendations: async (params = {}) => {
    const response = await api.get('/learning-paths/recommendations', { params });
    return response.data;
  }
};

export default learningPathService;
