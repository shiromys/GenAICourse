import express from 'express';
import { createCheckoutSession, getBundleUpgradePrice, verifyPaymentSession, getMyPayments, recoverPayments } from '../controllers/paymentController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes - Handled via Stripe sessionId
router.get('/verify-session/:sessionId', verifyPaymentSession);

// Checkout works for both logged-in users and guests (guest email required in body
// when not authenticated) — createCheckoutSession itself decides which case applies.
router.post('/create-session', optionalAuth, createCheckoutSession);
router.get('/bundle-price', protect, getBundleUpgradePrice);
router.get('/my-payments', protect, getMyPayments);

// Recovery: scan Stripe for paid-but-unprocessed sessions (tab-close / webhook-miss)
router.post('/recover', protect, recoverPayments);

export default router;
