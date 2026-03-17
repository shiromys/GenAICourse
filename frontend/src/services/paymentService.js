import api from './api';

const paymentService = {
    /**
     * Creates a Stripe Hosted Checkout Session.
     * Returns { success, url, sessionId } OR { success, freeUpgrade, redirectTo } for zero-cost upgrades.
     */
    createCheckoutSession: async (courseId, purchaseType = 'single') => {
        const response = await api.post('/payments/create-session', { courseId, purchaseType });
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
};

export default paymentService;
