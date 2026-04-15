import Stripe from 'stripe';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Payment from '../models/Payment.js';
import UserProgress from '../models/UserProgress.js';
import mongoose from 'mongoose';
import { sendEmail } from '../services/emailService.js';
import fs from 'fs';
import path from 'path';

const logToFile = (msg) => {
    try {
        const logPath = path.join(process.cwd(), 'payment-debug.log');
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
    } catch (e) { }
};

// ─────────────────────────────────────────────────────────────────────────────
// Stripe client
// ─────────────────────────────────────────────────────────────────────────────
const stripeApiKey = (process.env.STRIPE_SECRET_KEY || '').trim();
if (!stripeApiKey || stripeApiKey === 'sk_test_placeholder') {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing or invalid. Payment features will not work.');
}

const stripe = new Stripe(stripeApiKey || 'sk_test_placeholder', {
    apiVersion: '2024-11-20.acacia',
    timeout: 30000,
    maxNetworkRetries: 1,
});

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Payment confirmation email
// ─────────────────────────────────────────────────────────────────────────────
const buildPaymentEmail = (userName, courseTitle, amount, frontendUrl) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#E11D48 0%,#9F1239 100%);padding:40px;text-align:center;">
            <img src="${frontendUrl}/logo.png" alt="GenAI Logo" style="height: 45px; width: auto; margin-bottom: 10px; filter: brightness(0) invert(1);">
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Payment Confirmed</p>
          </td>
        </tr>
        <tr>
          <td style="padding:50px 40px;">
            <h2 style="margin:0 0 20px;color:#0F172A;font-size:24px;font-weight:800;">You're in, ${userName}! 🎉</h2>
            <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.7;">Your payment has been successfully processed and your access has been <strong style="color:#10B981;">activated</strong>.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;margin-bottom:32px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:800;color:#94A3B8;text-transform:uppercase;letter-spacing:2px;">Purchase Details</p>
                  <table width="100%"><tr>
                    <td style="font-size:16px;font-weight:700;color:#0F172A;">${courseTitle}</td>
                    <td align="right" style="font-size:20px;font-weight:900;color:#E11D48;">$${(amount / 100).toFixed(2)}</td>
                  </tr></table>
                  <hr style="border:0;border-top:1px solid #E2E8F0;margin:16px 0;">
                  <table width="100%"><tr>
                    <td style="font-size:14px;color:#64748B;">Status</td>
                    <td align="right" style="font-size:14px;font-weight:700;color:#10B981;">Activated</td>
                  </tr></table>
                </td>
              </tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:10px 0 32px;">
              <a href="${frontendUrl}/dashboard" style="display:inline-block;background:#E11D48;color:#ffffff;padding:18px 48px;border-radius:50px;text-decoration:none;font-weight:900;font-size:16px;letter-spacing:0.5px;box-shadow:0 10px 25px rgba(225,29,72,0.35);">
                Start Learning Now
              </a>
            </td></tr></table>
            <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">Happy learning,<br><strong>The GENAICOURSE.IO Team</strong></p>
          </td>
        </tr>
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#94A3B8;font-size:11px;font-weight:600;line-height:1.6;">
              This payment is <strong>non-refundable</strong>.<br>
              For support, reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPER: Calculate the upgrade credit for a user
// Returns { totalCredit, finalAmount, coursesPurchased, isFreeUpgrade }
// ─────────────────────────────────────────────────────────────────────────────
const BUNDLE_PRICE_CENTS = 159 * 100; // $159 in cents

const calculateUpgradeCredit = async (userId) => {
    const previousPayments = await Payment.find({
        userId,
        purchaseType: 'single',
        status: 'completed',
    });
    const totalCredit = previousPayments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
    const finalAmount = Math.max(0, BUNDLE_PRICE_CENTS - totalCredit);
    return {
        totalCredit,
        finalAmount,
        coursesPurchased: previousPayments.length,
        isFreeUpgrade: finalAmount === 0,
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPER: Grant all-access and initialise UserProgress for every course
// ─────────────────────────────────────────────────────────────────────────────
const grantAllAccess = async (userId, user) => {
    user.hasAllCoursesAccess = true;
    await user.save();
    const allCourses = await Course.find({ isPublished: true }).select('_id');
    for (const c of allCourses) {
        const exists = await UserProgress.findOne({ userId, courseId: c._id });
        if (!exists) await UserProgress.create({ userId, courseId: c._id });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 1 — Create Stripe Checkout Session (with upgrade-credit logic)
// POST /api/payments/create-session
// ─────────────────────────────────────────────────────────────────────────────
export const createCheckoutSession = async (req, res, next) => {
    try {
        const { courseId, purchaseType } = req.body;

        if (!purchaseType) {
            return res.status(400).json({ success: false, message: 'purchaseType is required' });
        }

        const userId = req.user._id.toString();
        const origin = req.headers.origin || req.headers.referer || '';
        // If it starts with localhost:3000, use that. Otherwise use env variable or default.
        let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        if (origin.includes('localhost:3000')) frontendUrl = 'http://localhost:3000';
        else if (origin.includes('localhost:5173')) frontendUrl = 'http://localhost:5173';

        console.log(`💳 Creating session for user ${userId} (Frontend Base: ${frontendUrl})`);

        let amount = 0;
        let productName = '';
        let productDescription = '';

        if (purchaseType === 'all') {
            const { totalCredit, finalAmount } = await calculateUpgradeCredit(userId);
            amount = finalAmount;

            productName = 'GENAICOURSE.IO — All-Access Pass';
            productDescription = totalCredit > 0
                ? `Upgrade: $${(finalAmount / 100).toFixed(2)} after $${(totalCredit / 100).toFixed(2)} credit from previous purchases`
                : 'Unlock all current and future courses';

            // EDGE CASE: Credit fully covers the bundle — no Stripe payment needed
            if (amount === 0) {
                const user = await User.findById(userId);
                if (!user) return res.status(404).json({ success: false, message: 'User not found' });

                // Prevent duplicate processing
                const alreadyBundled = await Payment.findOne({ userId, purchaseType: 'all', status: 'completed' });
                if (!alreadyBundled) {
                    await grantAllAccess(userId, user);
                    // ✅ Do NOT pass courseId: null — omit it so the sparse index is not affected
                    const freePayload = {
                        userId: new mongoose.Types.ObjectId(userId),
                        email: user.email,
                        purchaseType: 'all',
                        amountPaid: 0,
                        currency: 'usd',
                        status: 'completed',
                        enrollmentUpdated: true,
                    };
                    const freeRecord = await Payment.create(freePayload);
                    console.log(`✅ Free-upgrade invoice saved: ${freeRecord._id}`);
                    try {
                        await sendEmail(
                            user.email,
                            'All-Access Unlocked — GENAICOURSE.IO',
                            buildPaymentEmail(user.name, 'All-Access Pass (Full Credit Applied)', 0, frontendUrl)
                        );
                    } catch (e) {
                        console.error('Email error:', e.message);
                    }
                }

                // Signal the frontend to skip Stripe and go to dashboard
                return res.status(200).json({
                    success: true,
                    freeUpgrade: true,
                    message: 'All-Access granted via credit! Redirecting to dashboard.',
                    redirectTo: `${frontendUrl}/dashboard?payment=success`,
                });
            }

        } else {
            // Single course purchase
            if (!courseId) {
                return res.status(400).json({ success: false, message: 'courseId is required for single purchase' });
            }
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            const user = await User.findById(userId);
            if (user && (user.isEnrolledInCourse(courseId) || user.hasAllCoursesAccess)) {
                return res.status(400).json({ success: false, message: 'You already have access to this course.' });
            }
            amount = (course.price || 29) * 100;
            productName = `GENAICOURSE.IO — ${course.title}`;
            const rawDesc = (course.description || '').trim();
            // Stripe rejects undefined/empty string — always provide a fallback
            productDescription = rawDesc.length > 0 ? rawDesc.substring(0, 255) : 'Course Enrollment';
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: req.user.email,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productName,
                        description: productDescription,
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/pricing`,
            metadata: {
                userId,
                email: req.user.email,
                courseId: courseId || 'none',
                purchaseType,
            },
        });

        return res.status(200).json({
            success: true,
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('createCheckoutSession error:', error.message);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create checkout session',
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 1b — Get Bundle Upgrade Price for the logged-in user
// GET /api/payments/bundle-price
// ─────────────────────────────────────────────────────────────────────────────
export const getBundleUpgradePrice = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const { totalCredit, finalAmount, coursesPurchased, isFreeUpgrade } = await calculateUpgradeCredit(userId);

        return res.status(200).json({
            success: true,
            data: {
                bundlePrice: BUNDLE_PRICE_CENTS,   // 15900 cents = $159
                creditApplied: totalCredit,          // cents already paid
                finalAmount,                          // cents user will pay now
                coursesPurchased,
                isFreeUpgrade,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 2 — Stripe Webhook Event Handler
// POST /api/payments/webhook  (raw body — NOT parsed JSON)
// ─────────────────────────────────────────────────────────────────────────────
export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

    let event;

    try {
        if (!webhookSecret || webhookSecret === 'whsec_...') {
            const bodyStr = req.body instanceof Buffer ? req.body.toString('utf8') : req.body;
            event = typeof bodyStr === 'string' ? JSON.parse(bodyStr) : bodyStr;
        } else {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        }
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        if (session.payment_status !== 'paid') return res.json({ received: true });

        const { userId, courseId, purchaseType, email } = session.metadata || {};
        if (!userId) {
            console.error('❌ Webhook: Missing userId in metadata');
            return res.json({ received: true });
        }

        try {
            const existingPayment = await Payment.findOne({ stripeSessionId: session.id });
            if (existingPayment) return res.json({ received: true });

            const user = await User.findById(userId);
            if (!user) {
                console.error(`❌ Webhook: User ${userId} not found`);
                return res.json({ received: true });
            }

            let courseTitle = 'Your Course';
            const amountPaid = session.amount_total || 0;
            const userEmail = email || user.email;

            if (purchaseType === 'all') {
                courseTitle = 'All-Access Pass (GENAICOURSE.IO)';
                await grantAllAccess(userId, user);
            } else if (courseId && courseId !== 'none') {
                user.enrollInCourse(courseId);
                await user.save();
                const course = await Course.findById(courseId);
                courseTitle = course?.title || 'Your Course';
                const existingProgress = await UserProgress.findOne({ userId, courseId });
                if (!existingProgress) await UserProgress.create({ userId, courseId });
            }

            console.log(`📝 Creating record for ${purchaseType} (User: ${userId})...`);
            let paymentRecord = null;
            try {
                const paymentData = {
                    userId: new mongoose.Types.ObjectId(userId),
                    email: userEmail,
                    purchaseType,
                    amountPaid,
                    currency: session.currency || 'usd',
                    status: 'completed',
                    enrollmentUpdated: true,
                };
                // Only attach sparse properties if they exist
                if (session.id) paymentData.stripeSessionId = session.id;
                if (session.payment_intent) paymentData.stripePaymentIntentId = session.payment_intent;
                // Only attach courseId if it exists and is valid
                if (courseId && courseId !== 'none' && courseId !== 'null' && courseId !== 'undefined') {
                    paymentData.courseId = new mongoose.Types.ObjectId(courseId);
                }

                paymentRecord = await Payment.create(paymentData);
                console.log(`✅ Record saved: ${paymentRecord._id}`);
            } catch (createError) {
                console.error('❌ Record failed:', createError.message);
            }

            try {
                await sendEmail(
                    user.email,
                    `Payment Confirmed: ${courseTitle} — GENAICOURSE.IO`,
                    buildPaymentEmail(user.name, courseTitle, amountPaid, process.env.FRONTEND_URL)
                );
                if (paymentRecord) {
                    paymentRecord.emailSent = true;
                    await paymentRecord.save();
                }
            } catch (e) {
                console.error('Email error:', e.message);
            }

        } catch (error) {
            console.error('Webhook processing error:', error);
        }
    }

    res.json({ received: true });
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 3 — Verify payment after redirect
// GET /api/payments/verify-session/:sessionId
// ─────────────────────────────────────────────────────────────────────────────
export const verifyPaymentSession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) return res.status(400).json({ success: false, message: 'sessionId is required' });

        // Step 1: Check if webhook already processed this session
        const existingPayment = await Payment.findOne({ stripeSessionId: sessionId });
        if (existingPayment && existingPayment.enrollmentUpdated) {
            const userId = existingPayment.userId;
            const user = await User.findById(userId).populate('enrolledCourses.courseId', 'title thumbnail description');

            return res.status(200).json({
                success: true,
                message: 'Enrollment active.',
                alreadyProcessed: true,
                courseId: existingPayment.courseId,
                user: user ? user.getPublicProfile() : null,
            });
        }

        // Step 2: Fallback — verify directly with Stripe (webhook may be delayed)
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid') {
            return res.status(400).json({ success: false, message: 'Payment incomplete.' });
        }

        const { userId, courseId, purchaseType, email } = session.metadata || {};
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Missing metadata in session.' });
        }

        // If user is logged in, ensure it's their session. If not logged in, we let it pass for the success screen.
        if (req.user && userId !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized.' });
        }

        // Dedup check (in case webhook fired between our first check and now)
        const paymentExists = await Payment.findOne({ stripeSessionId: sessionId });
        if (paymentExists) {
            const user = await User.findById(userId).populate('enrolledCourses.courseId', 'title thumbnail description');
            return res.status(200).json({ success: true, courseId: paymentExists.courseId, user: user ? user.getPublicProfile() : null });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        let courseTitle = 'Your Course';
        const amountPaid = session.amount_total || 0;

        // ── SAVE PAYMENT RECORD FIRST (before slow grantAllAccess loop) ──
        console.log(`📝 [Fallback] Creating record (User: ${userId}, Type: ${purchaseType})...`);
        let savedPaymentId = null;
        try {
            console.log(`🎁 [Reconciliation] Finalizing bundle for ${user.email}. Amount: ${amountPaid}`);
            
            const paymentPayload = {
                userId: new mongoose.Types.ObjectId(userId),
                email: email || user.email,
                purchaseType: purchaseType || 'all',
                amountPaid: amountPaid,
                currency: session.currency || 'usd',
                status: 'completed',
                enrollmentUpdated: true,
            };

            // Only attach sparse properties if they exist
            if (session.id) paymentPayload.stripeSessionId = session.id;
            if (session.payment_intent) paymentPayload.stripePaymentIntentId = session.payment_intent;

            // Safely attach courseId if it's a valid ID string
            if (courseId && courseId !== 'none' && courseId !== 'null' && courseId !== 'undefined') {
                paymentPayload.courseId = new mongoose.Types.ObjectId(courseId);
            }

            const paymentRecord = await Payment.create(paymentPayload);
            console.log(`✅ [Reconciliation] Success. ID: ${paymentRecord._id}`);
            savedPaymentId = paymentRecord._id;
            console.log(`✅ [Fallback] Record saved: ${savedPaymentId}`);
        } catch (createError) {
            console.error('❌ [Fallback] Record failed:', createError.message);
        }

        // ── NOW run the enrollment grant (may be slow for all-access) ──
        if (purchaseType === 'all') {
            courseTitle = 'All-Access Pass';
            await grantAllAccess(userId, user);
        } else if (courseId && courseId !== 'none') {
            user.enrollInCourse(courseId);
            await user.save();
            const course = await Course.findById(courseId);
            courseTitle = course?.title || 'Your Course';
            const exists = await UserProgress.findOne({ userId, courseId });
            if (!exists) await UserProgress.create({ userId, courseId });
        }

        try {
            await sendEmail(
                user.email,
                `Payment Confirmed: ${courseTitle} — GENAICOURSE.IO`,
                buildPaymentEmail(user.name, courseTitle, amountPaid, process.env.FRONTEND_URL)
            );
        } catch (e) {
            console.error('Email error in verifySession:', e.message);
        }

        const updatedUser = await User.findById(userId).populate('enrolledCourses.courseId', 'title thumbnail description');
        return res.status(200).json({ success: true, courseId, user: updatedUser.getPublicProfile() });

    } catch (error) {
        // 🔴 LOG the full error so we can debug it properly — previously this was swallowing critical errors
        console.error('❌ verifyPaymentSession FULL ERROR:', error.message, error.stack);
        logToFile(`❌ verifyPaymentSession error: ${error.message}\n${error.stack}`);
        try {
            const fallbackUid = req.user?._id;
            const user = fallbackUid ? await User.findById(fallbackUid).populate('enrolledCourses.courseId', 'title thumbnail description') : null;
            return res.status(200).json({
                success: true,
                message: 'Payment received. Enrollment is being processed.',
                user: user ? user.getPublicProfile() : null,
            });
        } catch (_) {
            return res.status(200).json({
                success: true,
                message: 'Payment received. Your enrollment will reflect shortly.',
            });
        }
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 4b — Recover missed payments (tab-close / webhook-miss scenario)
// POST /api/payments/recover
// Queries Stripe for all recent paid sessions for this user's email that have
// NOT yet been recorded in our DB, then processes them immediately.
// ─────────────────────────────────────────────────────────────────────────────
export const recoverPayments = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const userEmail = (req.user.email || '').toLowerCase();

        console.log(`🔎 [Recovery] Scanning Stripe for unprocessed payments for ${userEmail}`);

        // Stripe list() does NOT support customer_email as a filter.
        // We fetch the most recent 100 sessions and filter manually.
        const sessions = await stripe.checkout.sessions.list({
            limit: 100,
        });

        const recovered = [];
        const alreadyProcessed = [];

        for (const session of sessions.data) {
            // Only handle fully paid sessions
            if (session.payment_status !== 'paid') continue;

            // Filter by email (case-insensitive)
            const sessionEmail = (session.customer_details?.email || session.customer_email || '').toLowerCase();
            if (sessionEmail !== userEmail) continue;

            // Check if we already have a record for this session
            const existing = await Payment.findOne({ stripeSessionId: session.id });
            if (existing) {
                alreadyProcessed.push(session.id);
                continue;
            }

            // Verify the session was created for this user (metadata guard)
            const { userId: sessionUserId, courseId, purchaseType } = session.metadata || {};
            if (sessionUserId && sessionUserId !== userId) {
                console.warn(`[Recovery] Session ${session.id} belongs to a different userId — skipping.`);
                continue;
            }

            console.log(`🔄 [Recovery] Processing missed session: ${session.id} (type: ${purchaseType})`);

            const user = await User.findById(userId);
            if (!user) continue;

            let courseTitle = 'Your Course';
            const amountPaid = session.amount_total || 0;

            // Build the payment record payload
            const paymentData = {
                userId: new mongoose.Types.ObjectId(userId),
                email: userEmail,
                purchaseType: purchaseType || 'single',
                amountPaid,
                currency: session.currency || 'usd',
                status: 'completed',
                enrollmentUpdated: true,
                stripeSessionId: session.id,
            };
            if (session.payment_intent) paymentData.stripePaymentIntentId = session.payment_intent;

            // Grant access based on purchase type
            if (purchaseType === 'all') {
                courseTitle = 'All-Access Pass (GENAICOURSE.IO)';
                await grantAllAccess(userId, user);
            } else if (courseId && courseId !== 'none' && courseId !== 'null' && courseId !== 'undefined') {
                paymentData.courseId = new mongoose.Types.ObjectId(courseId);
                user.enrollInCourse(courseId);
                await user.save();
                const course = await Course.findById(courseId);
                courseTitle = course?.title || 'Your Course';
                const exists = await UserProgress.findOne({ userId, courseId });
                if (!exists) await UserProgress.create({ userId, courseId });
            }

            try {
                const paymentRecord = await Payment.create(paymentData);
                console.log(`✅ [Recovery] Saved payment record: ${paymentRecord._id}`);
                recovered.push({
                    sessionId: session.id,
                    courseTitle,
                    amount: amountPaid,
                    purchaseType: purchaseType || 'single',
                });

                // Send confirmation email
                try {
                    await sendEmail(
                        user.email,
                        `Access Restored: ${courseTitle} — GENAICOURSE.IO`,
                        buildPaymentEmail(user.name, courseTitle, amountPaid, process.env.FRONTEND_URL || 'https://genaicourse.io')
                    );
                } catch (emailErr) {
                    console.warn('[Recovery] Email send failed:', emailErr.message);
                }
            } catch (createErr) {
                console.error('[Recovery] Failed to save record:', createErr.message);
            }
        }

        // Return fresh user profile so the frontend can update state immediately
        const updatedUser = await User.findById(userId).populate('enrolledCourses.courseId', 'title thumbnail description');

        console.log(`✅ [Recovery] Done. Recovered: ${recovered.length}, Already processed: ${alreadyProcessed.length}`);

        return res.status(200).json({
            success: true,
            recovered: recovered.length,
            items: recovered,
            user: updatedUser ? updatedUser.getPublicProfile() : null,
        });

    } catch (error) {
        console.error('❌ recoverPayments error:', error.message);
        next(error);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER 4 — Get all payments for the logged-in user
// GET /api/payments/my-payments
// ─────────────────────────────────────────────────────────────────────────────
export const getMyPayments = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userEmail = (req.user.email || '').toLowerCase();

        // 🔗 Robust Lookup: Search by both User ID and Current Email
        let payments = await Payment.find({
            $or: [
                { userId },
                { email: userEmail }
            ]
        })
            .populate('courseId', 'title thumbnail')
            .sort({ createdAt: -1 });

        // ── LAST-RESORT RECONCILIATION ──────────────────────────────────────────
        // If the user HAS all-access (flag is true in their User doc) but there is
        // NO 'all' payment record in the DB (invoice was lost due to a crash during
        // Payment.create), we create a healed record right now so it shows in the UI.
        const hasAllRecord = payments.some(p => p.purchaseType === 'all');
        if (!hasAllRecord) {
            // Re-fetch user to check the live flag (req.user may be stale)
            const liveUser = await User.findById(userId).select('hasAllCoursesAccess email');
            if (liveUser && liveUser.hasAllCoursesAccess) {
                console.log(`⚕️ [Reconcile] User ${userEmail} has all-access but no invoice — healing now...`);
                try {
                    // ✅ Calculate the actual final amount after deducting single-course credits
                    // e.g. if user bought $29 course first → $159 - $29 = $130 actual payment
                    const { finalAmount } = await calculateUpgradeCredit(userId);
                    const actualAmountPaid = finalAmount; // What the user really paid

                    const healedRecord = await Payment.create({
                        userId: new mongoose.Types.ObjectId(userId),
                        email: userEmail,
                        purchaseType: 'all',
                        amountPaid: actualAmountPaid, // Correct deducted price, not always $159
                        currency: 'usd',
                        status: 'completed',
                        enrollmentUpdated: true,
                    });
                    console.log(`✅ [Reconcile] Healed invoice: ${healedRecord._id} — Amount: $${(actualAmountPaid / 100).toFixed(2)}`);
                    payments = [healedRecord, ...payments];
                } catch (healErr) {
                    // Could be a race condition duplicate — just log and move on
                    console.warn(`⚠️ [Reconcile] Could not heal (likely duplicate): ${healErr.message}`);
                }
            }
        }
        // ────────────────────────────────────────────────────────────────────────

        // Prevent browser from caching this
        res.set('Cache-Control', 'no-store');
        res.status(200).json({ success: true, count: payments.length, data: payments });
    } catch (error) {
        next(error);
    }
};