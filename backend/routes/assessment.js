import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAssessmentForCourse,
  takeAssessment,
  getAssessmentResults,
  getAssessmentHistory
} from '../controllers/assessmentController.js';

const router = express.Router();

router.use(protect);

// FIX: Added 'student' to the authorized roles so learners can actually take the quiz
router.get('/:courseId/quiz', authorize('student', 'instructor', 'admin'), getAssessmentForCourse);
router.post('/:courseId/take', authorize('student', 'instructor', 'admin'), takeAssessment);

// Ensure results and history are also available to students
router.get('/:courseId/results/:attemptId', authorize('student', 'instructor', 'admin'), getAssessmentResults);
router.get('/:courseId/history', authorize('student', 'instructor', 'admin'), getAssessmentHistory);

// @route   GET /api/assessments/:courseId/quiz
// @desc    Get assessment for taking
// @access  Private (Student, Instructor, Admin)
// FIX: Explicitly authorize 'student' to prevent 403 Forbidden errors
router.get('/:courseId/quiz', authorize('student', 'instructor', 'admin'), getAssessmentForCourse);

// @route   POST /api/assessments/:courseId/take
// @desc    Take course assessment
// @access  Private (Student, Instructor, Admin)
router.post('/:courseId/take', authorize('student', 'instructor', 'admin'), takeAssessment);

// @route   GET /api/assessments/:courseId/results/:attemptId
// @desc    Get assessment results and feedback
// @access  Private
router.get('/:courseId/results/:attemptId', authorize('student', 'instructor', 'admin'), getAssessmentResults);

// @route   GET /api/assessments/:courseId/history
// @desc    Get user's assessment history for a course
// @access  Private
router.get('/:courseId/history', authorize('student', 'instructor', 'admin'), getAssessmentHistory);

// @route   GET /api/assessments/:courseId/progress-check
// @desc    Check if user can take assessment (debug endpoint)
// @access  Private
router.get('/:courseId/progress-check', async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const userProgress = await UserProgress.findOne({ userId, courseId });
    if (!userProgress) {
      return res.status(403).json({ success: false, message: 'Not enrolled in course' });
    }

    const completedLessonsCount = userProgress.completedLessons ? userProgress.completedLessons.length : 0;
    const totalLessonsCount = course.modules ? course.modules.reduce((acc, module) => acc + (module.lessons ? module.lessons.length : 0), 0) : 0;

    res.json({
      success: true,
      data: {
        courseId,
        completedLessons: completedLessonsCount,
        totalLessons: totalLessonsCount,
        canTakeAssessment: completedLessonsCount >= totalLessonsCount,
        progressPercentage: totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;