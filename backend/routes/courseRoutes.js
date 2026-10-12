import express from 'express';
import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getCourseProgress,
    getCourseCompletionStatus,
    updateCourseProgress,
    addReview,
    deleteReview,
    getEnrolledCourses,
    addBookmark,
    getBookmarks,
    addNote,
    getNotes,
    getCourseAnalytics
} from '../controllers/courseController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { courseValidation, validate } from '../middleware/validation.js';

const router = express.Router();

/**
 * Course Routes
 */

// Public routes
router.get('/', getCourses);
// /enrolled must be before /:id so "enrolled" is not matched as course id
router.get('/enrolled', protect, getEnrolledCourses);
// optionalAuth (not protect): this page is meant to be publicly browsable so
// anyone can decide whether to buy, but getCourse uses req.user (when present)
// to decide whether to include full lesson content or just the public outline.
router.get('/:id', optionalAuth, getCourse);

// Protected routes (User)
router.post('/:id/enroll', protect, enrollCourse);
router.get('/:id/progress', protect, getCourseProgress);
router.get('/:id/completion-status', protect, getCourseCompletionStatus);
router.put('/:id/progress', protect, updateCourseProgress);

// Protected routes (User)
router.post('/:id/reviews', protect, addReview);
router.delete('/:id/reviews/:reviewId', protect, authorize('admin'), deleteReview);
router.post('/:id/bookmarks', protect, addBookmark);
router.get('/:id/bookmarks', protect, getBookmarks);
router.post('/:id/notes', protect, addNote);
router.get('/:id/notes', protect, getNotes);
router.get('/:id/analytics', protect, authorize('instructor', 'admin'), getCourseAnalytics);

// Admin/Instructor routes
router.post('/', protect, authorize('instructor', 'admin'), courseValidation, validate, createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

export default router;
