import express from 'express';
import { createCheckoutSession, verifyPaymentSession } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (require JWT auth)
router.post('/create-session', protect, createCheckoutSession);
router.get('/verify-session/:sessionId', protect, verifyPaymentSession);

export default router;
