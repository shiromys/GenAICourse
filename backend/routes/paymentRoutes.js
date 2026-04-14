import express from 'express';
import { createCheckoutSession, getBundleUpgradePrice, verifyPaymentSession, getMyPayments, recoverPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes - Handled via Stripe sessionId
router.get('/verify-session/:sessionId', verifyPaymentSession);

// Protected routes (require JWT auth)
router.post('/create-session', protect, createCheckoutSession);
router.get('/bundle-price', protect, getBundleUpgradePrice);
router.get('/my-payments', protect, getMyPayments);

// Recovery: scan Stripe for paid-but-unprocessed sessions (tab-close / webhook-miss)
router.post('/recover', protect, recoverPayments);

export default router;
