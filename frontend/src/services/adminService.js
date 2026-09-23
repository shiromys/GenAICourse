import api from './api';

/**
 * Admin Service
 * Handles all admin-related API calls
 */

const adminService = {
    // Get dashboard stats
    getDashboardStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // Get payment analytics
    getPaymentAnalytics: async () => {
        const response = await api.get('/admin/payments/analytics');
        return response.data;
    },

    // Get all users
    getAllUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    // Get deleted users (Audit Log)
    getDeletedUsers: async () => {
        const response = await api.get('/admin/deleted-users');
        return response.data;
    },

    // Get recent platform activity (purchases, quiz passes, completions)
    getRecentActivity: async () => {
        const response = await api.get('/admin/activity');
        return response.data;
    },

    // Get per-quiz performance (attempts, avg score, pass rate)
    getQuizPerformance: async () => {
        const response = await api.get('/admin/quiz-performance');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id) => {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },

    // Update user role
    updateUserRole: async (id, role) => {
        const response = await api.put(`/admin/users/${id}/role`, { role });
        return response.data;
    },

    // Delete user (Soft)
    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },
    
    // Delete user (Permanent)
    permanentlyDeleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}/permanent`);
        return response.data;
    },

    // Get all courses (including unpublished)
    getAllCourses: async () => {
        const response = await api.get('/admin/courses');
        return response.data;
    },

    // Get single course
    getCourse: async (id) => {
        const response = await api.get(`/admin/courses/${id}`);
        return response.data;
    },

    // Create new course
    createCourse: async (courseData) => {
        const response = await api.post('/admin/courses', courseData);
        return response.data;
    },

    // Update course
    updateCourse: async (id, courseData) => {
        const response = await api.put(`/admin/courses/${id}`, courseData);
        return response.data;
    },

    // Delete course
    deleteCourse: async (id) => {
        const response = await api.delete(`/admin/courses/${id}`);
        return response.data;
    },

    // Get course enrollments
    getCourseEnrollments: async (id) => {
        const response = await api.get(`/admin/courses/${id}/enrollments`);
        return response.data;
    },

    // Get quiz by ID
    getQuiz: async (id) => {
        const response = await api.get(`/quizzes/${id}`);
        return response.data;
    },

    // ---- Global operations ----

    // Public maintenance status (also used inside the admin console for the System tab)
    getSettingsStatus: async () => {
        const response = await api.get('/settings/status');
        return response.data;
    },

    // Toggle maintenance mode / update its message
    updateMaintenanceMode: async ({ maintenanceMode, maintenanceMessage }) => {
        const response = await api.put('/admin/settings/maintenance', { maintenanceMode, maintenanceMessage });
        return response.data;
    },

    // Preview what a test-data reset would delete, without deleting anything
    previewDataReset: async () => {
        const response = await api.get('/admin/data-reset/preview');
        return response.data;
    },

    // Actually wipe test data — requires the exact confirmation phrase from the preview
    resetTestData: async (confirm) => {
        const response = await api.post('/admin/data-reset', { confirm });
        return response.data;
    },

    // ---- Support tickets ----

    getSupportTickets: async (status) => {
        const response = await api.get('/admin/support-tickets', { params: status ? { status } : {} });
        return response.data;
    },

    updateSupportTicket: async (id, updates) => {
        const response = await api.put(`/admin/support-tickets/${id}`, updates);
        return response.data;
    },

    // ---- Access overrides (support cases) ----

    grantCourseAccess: async (userId, courseId) => {
        const response = await api.post(`/admin/users/${userId}/grant-course`, { courseId });
        return response.data;
    },

    setAllCoursesAccess: async (userId, hasAllCoursesAccess) => {
        const response = await api.put(`/admin/users/${userId}/all-access`, { hasAllCoursesAccess });
        return response.data;
    }
};

export default adminService;
