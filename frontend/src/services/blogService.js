import api from './api';

/**
 * Blog Service
 * Public read access to published blog post cards (see /blog). Admin CRUD for blog posts
 * lives in adminService.js, matching where course admin CRUD already lives.
 */
const blogService = {
  getBlogPosts: async () => {
    const response = await api.get('/blog');
    return response.data;
  }
};

export default blogService;
