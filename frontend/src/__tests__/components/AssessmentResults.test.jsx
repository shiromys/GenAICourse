import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Regression test for a crash fixed on Oct 13: AssessmentResults (the quiz
// results screen, inside AssessmentCenter.jsx) referenced an out-of-scope
// `assessment` variable that only exists in the sibling AssessmentCenter
// component's state, not as a prop. Because the reference sat unconditionally
// in the "Achievement Percentage" stat (always rendered, pass or fail), EVERY
// learner who finished a quiz hit `ReferenceError: assessment is not defined`,
// which the app-wide ErrorBoundary (src/main.jsx) caught by replacing the
// entire page with a raw "Something went wrong" error screen. Fixed by
// passing `passingScore` from AssessmentCenter into AssessmentResults as an
// explicit prop instead of relying on the (non-existent) outer binding.

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    label: ({ children, ...props }) => <label {...props}>{children}</label>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock('../../services/courseService.js', () => ({
  default: {
    checkCourseCompletion: vi.fn().mockResolvedValue({ data: { allLessonsCompleted: true } }),
  },
}));

const mockSubmit = vi.fn();

vi.mock('../../services/assessmentService.js', () => ({
  default: {
    getAssessment: vi.fn().mockResolvedValue({
      title: 'Final Quiz',
      timeLimit: 10,
      passingScore: 70,
      questions: [
        { question: 'Q1?', options: ['A', 'B'], type: 'multiple-choice', points: 1 },
      ],
    }),
    submitAssessment: (...args) => mockSubmit(...args),
  },
}));

vi.mock('../../services/certificateService.js', () => ({
  default: { downloadCertificate: vi.fn() },
}));

import AssessmentCenter from '../../components/assessment/AssessmentCenter.jsx';

const submitQuiz = async () => {
  window.confirm = () => true;
  const finishBtn = await screen.findByText(/Finish Quest/i, {}, { timeout: 3000 });
  finishBtn.click();
};

describe('AssessmentResults — crash regression (undefined `assessment` reference)', () => {
  beforeEach(() => {
    mockSubmit.mockReset();
  });

  it('renders the FAIL screen without throwing, showing the real passing score', async () => {
    // Shape mirrors the real backend response from assessmentController.js's
    // POST /api/assessments/:courseId/take — note there is no top-level or
    // attempt-level `passingScore` field, which is exactly why the results
    // screen cannot read it from `results` and must receive it as a prop.
    mockSubmit.mockResolvedValue({
      success: true,
      message: 'You did not pass. Please try again.',
      attempt: { id: 'a1', score: 0, totalPoints: 1, percentageScore: 0, passed: false, grade: 'Fail', attemptNumber: 1 },
      certificate: null,
      nextAttemptAvailable: true,
      attemptsRemaining: 2,
    });

    render(<BrowserRouter><AssessmentCenter courseId="course123" /></BrowserRouter>);
    await submitQuiz();

    await waitFor(() => expect(screen.getByText(/Oops\.\.\. You failed!/i)).toBeTruthy());
    expect(screen.getByText(/70% required/i)).toBeTruthy();
    expect(screen.getByText(/didn't reach 70% this time/i)).toBeTruthy();
  });

  it('renders the PASS screen without throwing, showing the real passing score', async () => {
    mockSubmit.mockResolvedValue({
      success: true,
      message: 'Congratulations! You passed the assessment.',
      attempt: { id: 'a2', score: 1, totalPoints: 1, percentageScore: 100, passed: true, grade: 'A', attemptNumber: 1 },
      certificate: { id: 'cert1', downloadUrl: '/api/certificates/cert1/download' },
      nextAttemptAvailable: false,
      attemptsRemaining: 2,
    });

    render(<BrowserRouter><AssessmentCenter courseId="course123" /></BrowserRouter>);
    await submitQuiz();

    await waitFor(() => expect(screen.getByText(/Achievement!/i)).toBeTruthy());
    expect(screen.getByText(/70% required/i)).toBeTruthy();
  });
});
