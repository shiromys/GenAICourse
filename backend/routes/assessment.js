import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAssessmentForCourse,
  takeAssessment,
  getAssessmentResults,
  getAssessmentHistory
} from '../controllers/assessmentController.js';

const router = express.Router();

// All routes require login
router.use(protect);

// @route   GET /api/assessments/:courseId/quiz
// @desc    Get assessment for taking
// @access  Private (Student, Instructor, Admin)
router.get('/:courseId/quiz', authorize('student', 'instructor', 'admin'), getAssessmentForCourse);

// @route   POST /api/assessments/:courseId/take
// @desc    Submit course assessment
// @access  Private (Student, Instructor, Admin)
router.post('/:courseId/take', authorize('student', 'instructor', 'admin'), takeAssessment);

// @route   GET /api/assessments/:courseId/results/:attemptId
// @desc    Get assessment results and feedback
// @access  Private (Student, Instructor, Admin)
router.get('/:courseId/results/:attemptId', authorize('student', 'instructor', 'admin'), getAssessmentResults);

// @route   GET /api/assessments/:courseId/history
// @desc    Get user's assessment history for a course
// @access  Private (Student, Instructor, Admin)
router.get('/:courseId/history', authorize('student', 'instructor', 'admin'), getAssessmentHistory);

export default router;