/**
 * One-time script: Delete incorrectly priced ($159) healed bundle invoices
 * that have no Stripe Session ID (meaning they were created by reconciliation, not real payment).
 * After running this, "Sync Records" will re-create them with the correct $130 price.
 *
 * Run: node fix-bundle-price.mjs
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MONGODB_URI;

await mongoose.connect(MONGO_URI);
console.log('✅ Connected to MongoDB');

// Delete 'all' payment records that have NO stripeSessionId
// (these are reconciliation-created, not real Stripe payments)
const result = await mongoose.connection.collection('payments').deleteMany({
    purchaseType: 'all',
    stripeSessionId: { $exists: false }
});

console.log(`🗑️  Deleted ${result.deletedCount} incorrectly-priced healed bundle record(s).`);
console.log('✅ Done. Now click "Sync Records" on the Profile page to re-create with $130.');

await mongoose.disconnect();
process.exit(0);
