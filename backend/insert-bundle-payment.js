/**
 * One-time script: Insert missing All-Access bundle payment record
 * for a user who already has hasAllCoursesAccess=true but no payment record.
 * 
 * Run: node insert-bundle-payment.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Payment from './models/Payment.js';

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find users who have all-access but no bundle payment record
    const usersWithAllAccess = await User.find({ hasAllCoursesAccess: true });
    console.log(`Found ${usersWithAllAccess.length} user(s) with All-Access`);

    for (const user of usersWithAllAccess) {
        const existingRecord = await Payment.findOne({
            userId: user._id,
            purchaseType: 'all',
            status: 'completed',
        });

        if (existingRecord) {
            console.log(`  ⏭  ${user.name} — already has bundle payment record`);
            continue;
        }

        // Calculate what they paid: $159 - credit from single purchases
        const singlePayments = await Payment.find({
            userId: user._id,
            purchaseType: 'single',
            status: 'completed',
        });
        const totalCredit = singlePayments.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
        const bundlePrice = 159 * 100; // $159 in cents
        const amountPaid = Math.max(0, bundlePrice - totalCredit);

        const record = await Payment.create({
            userId: user._id,
            courseId: null,
            purchaseType: 'all',
            amountPaid,
            currency: 'usd',
            status: 'completed',
            enrollmentUpdated: true,
        });

        console.log(`  ✅ Created bundle record for ${user.name} — $${(amountPaid / 100).toFixed(2)} | ID: ${record._id}`);
    }

    console.log('Done.');
    process.exit(0);
};

run().catch(err => {
    console.error(err);
    process.exit(1);
});
