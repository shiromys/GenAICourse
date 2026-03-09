import Stripe from 'stripe';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Payment from '../models/Payment.js';
import { sendEmail } from '../services/emailService.js';

// ──────────────────────────────────────────────────────────────────────────────
// Stripe client — initialized once at module load
// ──────────────────────────────────────────────────────────────────────────────
const stripeApiKey = (process.env.STRIPE_SECRET_KEY || '').trim();
if (!stripeApiKey || stripeApiKey === 'sk_test_placeholder') {
    console.warn('⚠️  STRIPE_SECRET_KEY is missing or invalid. Payment features will not work.');
}

const stripe = new Stripe(stripeApiKey || 'sk_test_placeholder', {
    apiVersion: '2024-11-20.acacia', // pin to stable version
    timeout: 30000,  // 30s timeout
    maxNetworkRetries: 1,
});

// ──────────────────────────────────────────────────────────────────────────────
// HELPER: Build rich payment confirmation HTML email
// ──────────────────────────────────────────────────────────────────────────────
const buildPaymentEmail = (userName, courseTitle, amount, frontendUrl) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#E11D48 0%,#9F1239 100%);padding:40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:-1px;">GENAICOURSE.IO</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Payment Confirmed</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:50px 40px;">
            <h2 style="margin:0 0 20px;color:#0F172A;font-size:24px;font-weight:800;">You're in, ${userName}! 🎉</h2>
            <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.7;">Your payment has been successfully processed and your course access has been <strong style="color:#10B981;">activated</strong>.</p>

            <!-- Order Summary Box -->
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
                    <td align="right" style="font-size:14px;font-weight:700;color:#10B981;">✓ Activated</td>
                  </tr></table>
                </td>
              </tr>
            </table>

            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:10px 0 32px;">
              <a href="${frontendUrl}/dashboard" style="display:inline-block;background:#E11D48;color:#ffffff;padding:18px 48px;border-radius:50px;text-decoration:none;font-weight:900;font-size:16px;letter-spacing:0.5px;box-shadow:0 10px 25px rgba(225,29,72,0.35);">
                🚀 Start Learning Now
              </a>
            </td></tr></table>

            <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;">Happy learning,<br><strong>The GENAICOURSE.IO Team</strong></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#94A3B8;font-size:11px;font-weight:600;line-height:1.6;">
              ⚠️ This payment is <strong>non-refundable</strong> as per our Terms of Service.<br>
              For support, reply to this email. We're here to help.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

// ──────────────────────────────────────────────────────────────────────────────
// CONTROLLER 1 — Create Stripe Checkout Session
// POST /api/payments/create-session
// ──────────────────────────────────────────────────────────────────────────────
export const createCheckoutSession = async (req, res, next) => {
    try {
        const { courseId, purchaseType } = req.body;

        if (!purchaseType) {
            return res.status(400).json({ success: false, message: 'purchaseType is required' });
        }

        const userId = req.user._id.toString();
        let amount = 0;
        let productName = '';
        let productDescription = '';

        if (purchaseType === 'all') {
            amount = 159 * 100; // cents
            productName = 'GENAICOURSE.IO — All-Access Pass';
            productDescription = 'Unlock all current and future courses';
        } else {
            if (!courseId) {
                return res.status(400).json({ success: false, message: 'courseId is required for single purchase' });
            }
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            // Check: already enrolled?
            const user = await User.findById(userId);
            if (user && user.isEnrolledInCourse(courseId)) {
                return res.status(400).json({ success: false, message: 'You are already enrolled in this course.' });
            }
            amount = (course.price || 29) * 100;
            productName = `GENAICOURSE.IO — ${course.title}`;
            // Stripe requires description to be non-empty string if provided
            const rawDesc = (course.description || '').trim();
            productDescription = rawDesc.length > 0 ? rawDesc.substring(0, 255) : undefined;
        }

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        // Build session object — only include description if non-empty
        const lineItemProductData = { name: productName };
        if (productDescription) lineItemProductData.description = productDescription;

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: req.user.email,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: lineItemProductData,
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/checkout/${courseId || 'all'}?type=${purchaseType}&cancelled=true`,
            metadata: {
                userId,
                courseId: courseId || 'none',
                purchaseType,
            },
        });

        console.log(`✅ Stripe session created: ${session.id} for user: ${userId}`);

        res.status(200).json({
            success: true,
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        // Log the full Stripe error for debugging
        console.error('❌ createCheckoutSession error:');
        console.error('  Message:', error.message);
        console.error('  Type:', error.type);
        console.error('  Raw:', JSON.stringify(error?.raw || {}, null, 2));
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create checkout session',
            stripeError: error.type || null,
        });
    }
};

// ──────────────────────────────────────────────────────────────────────────────
// CONTROLLER 2 — Stripe Webhook Event Handler
// POST /api/payments/webhook
// ⚠️  This route MUST receive the raw body — NOT parsed JSON
// ──────────────────────────────────────────────────────────────────────────────
export const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

    let event;

    // ── Step 1: Verify webhook signature ──────────────────────────────────────
    try {
        if (!webhookSecret || webhookSecret === 'whsec_...') {
            console.warn('⚠️  STRIPE_WEBHOOK_SECRET not configured. Skipping signature verification.');
            // In dev without CLI, parse body anyway (INSECURE — remove in production)
            event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } else {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        }
    } catch (err) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`📡 Webhook received: ${event.type}`);

    // ── Step 2: Handle checkout.session.completed ─────────────────────────────
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Only process paid sessions
        if (session.payment_status !== 'paid') {
            console.log(`⚠️  Session ${session.id} is not paid yet. Skipping.`);
            return res.json({ received: true });
        }

        const { userId, courseId, purchaseType } = session.metadata || {};

        if (!userId) {
            console.error('❌ Webhook metadata missing userId. Cannot process.');
            return res.json({ received: true });
        }

        try {
            // ── Step 3: Deduplication — check if already processed ─────────────
            const existingPayment = await Payment.findOne({ stripeSessionId: session.id });
            if (existingPayment) {
                console.log(`ℹ️  Session ${session.id} already processed. Skipping duplicate.`);
                return res.json({ received: true });
            }

            // ── Step 4: Find user ──────────────────────────────────────────────
            const user = await User.findById(userId);
            if (!user) {
                console.error(`❌ User not found for ID: ${userId}`);
                return res.json({ received: true });
            }

            let courseTitle = 'Your Course';
            let amountPaid = session.amount_total || 0;

            // ── Step 5: Update user enrollment ────────────────────────────────
            if (purchaseType === 'all') {
                user.hasAllCoursesAccess = true;
                courseTitle = 'All-Access Pass (GENAICOURSE.IO)';
            } else if (courseId && courseId !== 'none') {
                const enrolled = user.enrollInCourse(courseId); // returns true if newly enrolled
                if (!enrolled) {
                    console.log(`ℹ️  User ${userId} was already enrolled in ${courseId}`);
                }
                const course = await Course.findById(courseId);
                courseTitle = course?.title || 'Your Course';
            }

            await user.save();
            console.log(`✅ Enrollment updated for user: ${user.email}`);

            // ── Step 6: Create Payment record ──────────────────────────────────
            const paymentRecord = new Payment({
                userId,
                courseId: courseId !== 'none' ? courseId : null,
                purchaseType,
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent,
                amountPaid,
                currency: session.currency || 'usd',
                status: 'completed',
                enrollmentUpdated: true,
            });

            // ── Step 7: Send confirmation email ───────────────────────────────
            try {
                await sendEmail(
                    user.email,
                    `✅ Payment Confirmed: ${courseTitle} — GENAICOURSE.IO`,
                    buildPaymentEmail(user.name, courseTitle, amountPaid, process.env.FRONTEND_URL)
                );
                paymentRecord.emailSent = true;
                console.log(`✅ Confirmation email sent to: ${user.email}`);
            } catch (emailError) {
                // Don't fail the webhook over email errors
                console.error('❌ Failed to send payment confirmation email:', emailError.message);
            }

            await paymentRecord.save();
            console.log(`✅ Payment record saved: ${paymentRecord._id}`);

        } catch (error) {
            console.error('❌ Error processing webhook payment_intent:', error);
            // Return 200 so Stripe doesn't retry — log for manual investigation
        }
    }

    // Always acknowledge receipt to Stripe
    res.json({ received: true });
};

// ──────────────────────────────────────────────────────────────────────────────
// CONTROLLER 3 — Verify payment after redirect (called from /payment-success page)
// GET /api/payments/verify-session/:sessionId
// ──────────────────────────────────────────────────────────────────────────────
export const verifyPaymentSession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ success: false, message: 'sessionId is required' });
        }

        // Check if already processed by webhook
        const existingPayment = await Payment.findOne({ stripeSessionId: sessionId });
        if (existingPayment && existingPayment.enrollmentUpdated) {
            // Refresh user from DB to get latest enrolledCourses
            const user = await User.findById(req.user._id).populate('enrolledCourses.courseId', 'title thumbnail description');
            return res.status(200).json({
                success: true,
                message: 'Payment already processed. Enrollment is active.',
                alreadyProcessed: true,
                user: user.getPublicProfile(),
            });
        }

        // Fallback: fetch from Stripe directly and process (in case webhook was delayed)
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ success: false, message: 'Payment is not completed.' });
        }

        const { userId, courseId, purchaseType } = session.metadata || {};

        // Security: make sure the requesting user matches the payment metadata
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized.' });
        }

        // Check deduplication again
        const paymentExists = await Payment.findOne({ stripeSessionId: sessionId });
        if (paymentExists) {
            const user = await User.findById(req.user._id).populate('enrolledCourses.courseId', 'title thumbnail description');
            return res.status(200).json({ success: true, message: 'Enrollment is active.', user: user.getPublicProfile() });
        }

        const user = await User.findById(userId);
        let courseTitle = 'Your Course';

        if (purchaseType === 'all') {
            user.hasAllCoursesAccess = true;
            courseTitle = 'All-Access Pass';
        } else if (courseId && courseId !== 'none') {
            user.enrollInCourse(courseId);
            const course = await Course.findById(courseId);
            courseTitle = course?.title || 'Your Course';
        }

        await user.save();

        await Payment.create({
            userId,
            courseId: courseId !== 'none' ? courseId : null,
            purchaseType,
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
            amountPaid: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'completed',
            enrollmentUpdated: true,
        });

        // Attempt email (best effort)
        try {
            await sendEmail(
                user.email,
                `✅ Payment Confirmed: ${courseTitle} — GENAICOURSE.IO`,
                buildPaymentEmail(user.name, courseTitle, session.amount_total || 0, process.env.FRONTEND_URL)
            );
        } catch (e) {
            console.error('❌ Email send error in verifySession:', e.message);
        }

        const updatedUser = await User.findById(userId).populate('enrolledCourses.courseId', 'title thumbnail description');

        return res.status(200).json({
            success: true,
            message: 'Payment verified and enrollment activated.',
            user: updatedUser.getPublicProfile(),
        });

    } catch (error) {
        console.error('❌ verifyPaymentSession error:', error.message);
        next(error);
    }
};
