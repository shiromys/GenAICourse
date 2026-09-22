import Quiz from '../models/Quiz.js';
import UserQuizAttempt from '../models/UserQuizAttempt.js';
import UserProgress from '../models/UserProgress.js';
import Course from '../models/Course.js';
import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import { issueCertificate } from '../services/certificateService.js';
import asyncHandler from 'express-async-handler';

// @desc    Get assessment details for a course (for taking the quiz)
// @route   GET /api/assessments/:courseId/quiz
// @access  Private (Student only)
export const getAssessmentForCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  if (!course.quizId) {
    return res.status(404).json({ message: 'Assessment not found for this course' });
  }

  const quiz = await Quiz.findById(course.quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Assessment not found' });
  }

  // Check if quiz is published OR if the course is published (assuming linked quiz should be available)
  if (!quiz.isPublished && !course.isPublished) {
    return res.status(403).json({ message: 'Assessment is not published yet' });
  }

  // Filter out correct answers for students
  const quizForStudent = {
    _id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    timeLimit: quiz.timeLimit,
    maxAttempts: quiz.maxAttempts,
    passingScore: quiz.passingScore,
    questions: quiz.questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options.map(opt => opt.text),
      points: q.points,
      type: q.type
    }))
  };

  res.json(quizForStudent);
});

// @desc    Take course assessment
// @route   POST /api/assessments/:courseId/take
// @access  Private (Student only)
export const takeAssessment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { answers, timeSpent } = req.body;
  const userId = req.user.id;

  // Validate required fields
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({
      success: false,
      message: 'Answers are required and must be an array'
    });
  }

  // Validate courseId
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: 'Course ID is required'
    });
  }

  console.log(`Assessment submission: userId=${userId}, courseId=${courseId}, answers=${answers.length}, timeSpent=${timeSpent}`);

  // Get course and quiz
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const quiz = await Quiz.findById(course.quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Assessment not found for this course' });
  }

  // Check if user is enrolled
  const userProgress = await UserProgress.findOne({ userId, courseId });
  if (!userProgress) {
    return res.status(403).json({ message: 'You must be enrolled in this course to take the assessment' });
  }

  // Check if course is completed (all lessons done)
  const completedLessonsCount = userProgress.completedLessons ? userProgress.completedLessons.length : 0;

  // Calculate total lessons from modules since course.lessons doesn't exist at top level
  const totalLessonsCount = course.modules ? course.modules.reduce((acc, module) => acc + (module.lessons ? module.lessons.length : 0), 0) : 0;

  if (completedLessonsCount < totalLessonsCount) {
    return res.status(400).json({
      success: false,
      message: `You must complete all lessons before taking the assessment. Completed: ${completedLessonsCount}/${totalLessonsCount}`,
      lessonsCompleted: completedLessonsCount,
      totalLessons: totalLessonsCount,
      progressPercentage: Math.round((completedLessonsCount / totalLessonsCount) * 100)
    });
  }

  // Check previous attempts
  const previousAttempts = await UserQuizAttempt.find({
    userId,
    quizId: quiz._id
  }).sort({ createdAt: -1 });

  // Use a very high limit for development/testing or use the quiz.maxAttempts
  const effectiveMaxAttempts = 99; // Explicitly increased to allow progression

  if (previousAttempts.length >= effectiveMaxAttempts) {
    return res.status(400).json({
      message: `Maximum attempts (${effectiveMaxAttempts}) reached`,
      attempts: previousAttempts.length
    });
  }

  // Calculate score
  let score = 0;
  let correctAnswers = 0;
  const results = [];

  quiz.questions.forEach((question, index) => {
    const userAnswer = answers[index];

    // Determine the correct answer(s)
    let correctAnswers_list = [];
    if (question.correctAnswer) {
      correctAnswers_list = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
    } else if (question.options && question.options.length > 0) {
      correctAnswers_list = question.options.filter(opt => opt.isCorrect).map(opt => opt.text);
    }

    const isCorrect = Array.isArray(userAnswer)
      ? (Array.isArray(correctAnswers_list) &&
        userAnswer.length === correctAnswers_list.length &&
        [...userAnswer].sort().every((val, i) => val === [...correctAnswers_list].sort()[i]))
      : (correctAnswers_list.includes(userAnswer));

    if (isCorrect) {
      score += question.points || 1;
      correctAnswers++;
    }

    results.push({
      questionId: question._id,
      question: question.question,
      userAnswer,
      correctAnswer: correctAnswers_list.length === 1 ? correctAnswers_list[0] : correctAnswers_list,
      isCorrect,
      points: question.points || 1,
      explanation: question.explanation
    });
  });

  const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  let percentageScore = 0;

  if (totalPoints > 0) {
    percentageScore = Math.round((score / totalPoints) * 100);
  }

  // Determine pass/fail (50% required)
  const passed = percentageScore >= 50;
  const grade = passed ? getGrade(percentageScore) : 'Fail';

  // Prepare answers in the correct format for UserQuizAttempt model
  const formattedAnswers = results.map((res, index) => {
    return {
      questionIndex: index,
      userAnswer: res.userAnswer,
      isCorrect: res.isCorrect,
      pointsEarned: res.isCorrect ? res.points : 0,
      timeSpent: 0
    };
  });

  const timeStarted = new Date();
  const timeCompleted = new Date();
  const duration = timeSpent || 0;

  // Save attempt
  const attempt = await UserQuizAttempt.create({
    userId,
    quizId: quiz._id,
    attemptNumber: previousAttempts.length + 1,
    answers: formattedAnswers,
    score: percentageScore,
    totalPoints,
    passed,
    timeStarted,
    timeCompleted,
    duration
  });

  // Update user progress
  userProgress.completeQuiz(quiz._id, attempt._id, percentageScore, passed);

  let certificateIssued = null;
  let certificatePendingSetup = false;

  if (passed) {
    let certificate = await Certificate.findOne({ userId, courseId });

    if (!certificate) {
      certificate = await generateCertificate(userId, courseId, percentageScore, grade);
    } else {
      certificate.score = percentageScore;
      certificate.grade = grade;
      certificate.completionDate = new Date();
      await certificate.save();
    }

    if (certificate) {
      userProgress.certificate = certificate._id;
      certificateIssued = certificate;
    } else {
      // Guest account — course is completed, but the certificate is withheld
      // until they finish account setup.
      certificatePendingSetup = true;
    }
    userProgress.completedAt = new Date();
  }

  await userProgress.save();

  // Update user stats
  const user = await User.findById(userId);
  if (passed && user) {
    if (!user.stats) {
    	user.stats = { coursesCompleted: 0, certificatesEarned: 0, averageScore: 0 };
    }
    user.stats.coursesCompleted = (user.stats.coursesCompleted || 0) + 1;
    user.stats.certificatesEarned = (user.stats.certificatesEarned || 0) + 1;
    
    const prevScore = user.stats.averageScore || 0;
    const completed = user.stats.coursesCompleted;
    user.stats.averageScore = ((prevScore * (completed - 1)) + percentageScore) / completed;
    
    await user.save();
  }

  res.json({
    success: true,
    message: certificatePendingSetup
      ? 'Congratulations! You passed the assessment. Complete your account setup to receive your certificate.'
      : (passed ? 'Congratulations! You passed the assessment.' : 'You did not pass. Please try again.'),
    attempt: {
      id: attempt._id,
      score,
      totalPoints,
      percentageScore,
      passed,
      grade,
      attemptNumber: attempt.attemptNumber,
      results,
      timeSpent,
      createdAt: attempt.createdAt
    },
    certificate: certificateIssued ? {
      id: certificateIssued._id,
      downloadUrl: `/api/certificates/${certificateIssued._id}/download`
    } : (certificatePendingSetup ? { pending: true, reason: 'ACCOUNT_SETUP_REQUIRED' } : null),
    nextAttemptAvailable: previousAttempts.length < quiz.maxAttempts - 1,
    attemptsRemaining: quiz.maxAttempts - (previousAttempts.length + 1)
  });
});

// @desc    Get assessment results and feedback
// @route   GET /api/assessments/:courseId/results/:attemptId
// @access  Private
export const getAssessmentResults = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const userId = req.user.id;

  const attempt = await UserQuizAttempt.findOne({
    _id: attemptId,
    userId
  }).populate('quizId', 'title passingScore maxAttempts');

  if (!attempt) {
    return res.status(404).json({ message: 'Assessment attempt not found' });
  }

  res.json({
    success: true,
    attempt: {
      id: attempt._id,
      score: attempt.score,
      totalPoints: attempt.totalPoints,
      percentageScore: attempt.score,
      passed: attempt.passed,
      grade: attempt.grade,
      attemptNumber: attempt.attemptNumber,
      timeSpent: attempt.duration,
      createdAt: attempt.createdAt,
      results: attempt.answers.map(ans => ({
        questionIndex: ans.questionIndex,
        userAnswer: ans.userAnswer,
        isCorrect: ans.isCorrect,
        points: ans.pointsEarned
      }))
    },
    quiz: {
      title: attempt.quizId.title,
      passingScore: attempt.quizId.passingScore,
      maxAttempts: attempt.quizId.maxAttempts
    }
  });
});

// @desc    Get user's assessment history for a course
// @route   GET /api/assessments/:courseId/history
// @access  Private
export const getAssessmentHistory = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const attempts = await UserQuizAttempt.find({ userId, quizId: { $in: await Quiz.find({ courseId }).distinct('_id') } })
    .sort({ createdAt: -1 })
    .select('score percentageScore passed grade attemptNumber createdAt timeSpent');

  const userProgress = await UserProgress.findOne({ userId, courseId })
    .select('completedAt certificate');

  res.json({
    attempts,
    courseCompleted: userProgress?.certificate ? true : false,
    completedAt: userProgress?.completedAt,
    hasCertificate: !!userProgress?.certificate,
    certificateId: userProgress?.certificate
  });
});

// Helper function to determine grade (50% passing threshold)
function getGrade(score) {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'B+';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 50) return 'Pass';
  return 'Fail';
}

// Helper function to generate certificate
// Returns null (no certificate issued yet) for guest accounts — the certificate
// carries the account's name, and a guest account doesn't have a real one set
// until they complete account setup. The course is still marked completed;
// the certificate is generated retroactively once they set up their account
// (see completeAccountSetup in authController.js).
async function generateCertificate(userId, courseId, score, grade) {
  return issueCertificate({ userId, courseId, score, grade });
}

export default {
  getAssessmentForCourse,
  takeAssessment,
  getAssessmentResults,
  getAssessmentHistory
};