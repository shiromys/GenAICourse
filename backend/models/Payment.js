import mongoose from 'mongoose';

/**
 * Payment Model
 * Tracks all Stripe payment transactions for audit, deduplication, and reconciliation.
 */
const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: null
    },
    purchaseType: {
        type: String,
        enum: ['single', 'all'],
        required: true
    },
    // Stripe identifiers — used for deduplication
    stripeSessionId: {
        type: String,
        unique: true,
        sparse: true // allows null but enforces unique when set
    },
    stripePaymentIntentId: {
        type: String,
        unique: true,
        sparse: true
    },
    amountPaid: {
        type: Number, // in cents (e.g., 2900 = $29)
        required: true
    },
    currency: {
        type: String,
        default: 'usd'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'completed'
    },
    emailSent: {
        type: Boolean,
        default: false
    },
    enrollmentUpdated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
