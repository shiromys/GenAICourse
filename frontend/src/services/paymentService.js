import api from './api';

const paymentService = {
    /**
     * Creates a Stripe Hosted Checkout Session.
     * Pass `guestEmail` when the buyer isn't logged in — the backend creates a
     * lightweight guest account behind the scenes and returns a `token` for it,
     * which the caller should store (see AuthContext.handleOAuthSuccess) before
     * redirecting to Stripe so the buyer comes back already signed in.
     * Returns { success, url, sessionId, token? } OR { success, freeUpgrade, redirectTo, token? }
     * for zero-cost upgrades. A guest email that already belongs to a real
     * account comes back as a 409 with code 'ACCOUNT_EXISTS'.
     */
    createCheckoutSession: async (courseId, purchaseType = 'single', guestEmail = null) => {
        const payload = { courseId, purchaseType };
        if (guestEmail) payload.email = guestEmail;
        const response = await api.post('/payments/create-session', payload);
        return response.data;
    },

    /**
     * Get the effective bundle price for the logged-in user after deducting credits
     * from any previously purchased single courses.
     * Returns { bundlePrice, creditApplied, finalAmount, coursesPurchased, isFreeUpgrade }
     * (all monetary values are in cents)
     */
    getBundlePrice: async () => {
        const response = await api.get('/payments/bundle-price');
        return response.data;
    },

    /**
     * Called from /payment-success page after Stripe redirects back.
     * Verifies the session, updates enrollment, and returns fresh user profile.
     */
    verifySession: async (sessionId) => {
        const response = await api.get(`/payments/verify-session/${sessionId}`);
        return response.data;
    },

    /**
     * Get all payments for the current logged in user.
     */
    getMyPayments: async () => {
        const response = await api.get('/payments/my-payments');
        return response.data;
    },

    /**
     * Recovery: scan Stripe for any paid-but-unprocessed sessions for this user.
     * Handles the "closed the tab" scenario where neither webhook nor success-page fired.
     * Returns { recovered, items, user }
     */
    recoverPayments: async () => {
        const response = await api.post('/payments/recover');
        return response.data;
    },
};

export default paymentService;
