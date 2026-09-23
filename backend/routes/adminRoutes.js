import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    permanentlyDeleteUser,
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    uploadCourseFromJSON,
    getDashboardStats,
    getCourseEnrollments,
    getPaymentAnalytics,
    getDeletedUsers,
    getRecentActivity,
    getQuizPerformance
} from '../controllers/adminController.js';
import { updateMaintenanceMode } from '../controllers/settingsController.js';
import { previewTestDataReset, resetTestData } from '../controllers/dataResetController.js';
import { grantCourseAccess, setAllCoursesAccess } from '../controllers/accessController.js';
import { getSupportTickets, updateSupportTicket } from '../controllers/supportTicketController.js';

import { protect, authorize } from '../middleware/auth.js';


const router = express.Router();

/**
 * Admin Routes
 * All routes require admin authentication
 */

// Apply admin authorization to all routes
router.use(protect);
router.use(authorize('admin'));

// JSON upload
router.post('/courses/save-json', uploadCourseFromJSON);

// Dashboard
// Dashboard & Analytics
router.get('/stats', getDashboardStats);
router.get('/payments/analytics', getPaymentAnalytics);
router.get('/activity', getRecentActivity);
router.get('/quiz-performance', getQuizPerformance);

// Global operations
router.put('/settings/maintenance', updateMaintenanceMode);
router.get('/data-reset/preview', previewTestDataReset);
router.post('/data-reset', resetTestData);

// Support tickets
router.get('/support-tickets', getSupportTickets);
router.put('/support-tickets/:id', updateSupportTicket);

// Access overrides (support cases)
router.post('/users/:id/grant-course', grantCourseAccess);
router.put('/users/:id/all-access', setAllCoursesAccess);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.delete('/users/:id/permanent', permanentlyDeleteUser);
router.get('/deleted-users', getDeletedUsers);

// Course management
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourse);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.get('/courses/:id/enrollments', getCourseEnrollments);



export default router;
