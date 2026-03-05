import express from 'express';
import multer from 'multer';
import { protect, authorize } from '../middleware/auth.js';
import {
  uploadAssessment,
  importAssessmentFromFile,
  getAssessmentTemplate,
  getInstructorAssessments,
  updateAssessment,
  deleteAssessment
} from '../controllers/assessmentUploadController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/json', 'text/csv', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON and CSV files are allowed'), false);
    }
  }
});

// Add a simple auth test route
router.get('/auth-test', protect, (req, res) => {
  res.json({
    message: 'Authentication test',
    user: req.user,
    isAuthenticated: true
  });
});

// All routes below require authentication
router.use(protect);

// Instructor/Admin-only routes — each uses authorize individually
// @route   GET /api/assessments/template
router.get('/template', authorize('instructor', 'admin'), getAssessmentTemplate);

// @route   POST /api/assessments/upload
router.post('/upload', authorize('instructor', 'admin'), uploadAssessment);

// @route   POST /api/assessments/import-file
router.post('/import-file', authorize('instructor', 'admin'), upload.single('assessmentFile'), importAssessmentFromFile);

// @route   GET /api/assessments/instructor
router.get('/instructor', authorize('instructor', 'admin'), getInstructorAssessments);

// @route   PUT /api/assessments/:id
router.put('/:id', authorize('instructor', 'admin'), updateAssessment);

// @route   DELETE /api/assessments/:id
router.delete('/:id', authorize('instructor', 'admin'), deleteAssessment);



export default router;