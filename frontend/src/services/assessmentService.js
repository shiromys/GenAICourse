import api from './api';

// Re-throws with a sensible default .message while preserving the original
// axios error's `.response` (status, body) on the thrown object. Every method
// below used to `throw new Error(message)` instead, which silently discarded
// `.response` entirely — any caller branching on `err.response?.status` or
// reading a field from `err.response?.data` beyond the flattened message
// always got `undefined`, no matter what the backend actually sent back. That
// made several distinct error cases in AssessmentCenter.jsx (not enrolled, no
// assessment linked, attempts exhausted) collapse into one generic fallback
// message, and the real "Maximum attempts (3) reached" message from the
// backend never reached the UI at all.
const rethrow = (error, fallbackMessage) => {
  const err = new Error(error.response?.data?.message || fallbackMessage);
  err.response = error.response;
  throw err;
};

const assessmentService = {
  // Get assessment details for a course
  getAssessment: async (courseId) => {
    try {
      const response = await api.get(`/assessments/${courseId}/quiz`);
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to load assessment');
    }
  },

  // Submit assessment
  submitAssessment: async (courseId, assessmentData) => {
    try {
      const response = await api.post(
        `/assessments/${courseId}/take`,
        assessmentData
      );
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to submit assessment');
    }
  },

  // Get assessment results
  getResults: async (courseId, attemptId) => {
    try {
      const response = await api.get(
        `/assessments/${courseId}/results/${attemptId}`
      );
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to load results');
    }
  },

  // Get assessment history
  getHistory: async (courseId) => {
    try {
      const response = await api.get(`/assessments/${courseId}/history`);
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to load assessment history');
    }
  },

  // Check if assessment is available for course
  checkAssessmentAvailability: async (courseId) => {
    try {
      const response = await api.get(`/assessments/${courseId}/check`);
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to check assessment availability');
    }
  },

  // Check user progress for assessment eligibility
  checkProgress: async (courseId) => {
    try {
      const response = await api.get(`/assessments/${courseId}/progress-check`);
      return response.data;
    } catch (error) {
      rethrow(error, 'Failed to check progress');
    }
  }
};

export default assessmentService;