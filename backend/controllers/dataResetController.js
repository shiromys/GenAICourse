import User from '../models/User.js';
import Payment from '../models/Payment.js';
import UserProgress from '../models/UserProgress.js';
import UserQuizAttempt from '../models/UserQuizAttempt.js';
import Certificate from '../models/Certificate.js';

/**
 * "Wipe test data" — the one-time reset an admin runs right before going live, to clear out
 * everything created while testing (accounts, payments, progress, quiz attempts,
 * certificates) without touching real product content (Course/Quiz definitions) or any
 * admin account.
 *
 * SAFETY DESIGN:
 * - Scope is every User with role !== 'admin' (regardless of isDeleted), plus every record
 *   that references one of those user ids. Admin accounts are never touched or counted.
 * - Course and Quiz documents are never deleted by this — those are real content, not test
 *   data, and this tool has no business touching them.
 * - The real delete (resetTestData) refuses to run unless req.body.confirm exactly equals
 *   the phrase "DELETE ALL TEST DATA" — this is checked here, not just in the UI, so a
 *   scripted or malformed request can't trigger it by accident.
 * - previewTestDataReset (GET) never deletes anything — it only counts what a real run
 *   would remove, so the admin can see the blast radius before typing the confirmation phrase.
 */

const CONFIRM_PHRASE = 'DELETE ALL TEST DATA';

const getNonAdminUserIds = async () => {
    const users = await User.find({ role: { $ne: 'admin' } }).select('_id');
    return users.map(u => u._id);
};

/**
 * @desc    Preview what a test-data reset would delete, without deleting anything
 * @route   GET /api/admin/data-reset/preview
 * @access  Private/Admin
 */
export const previewTestDataReset = async (req, res, next) => {
    try {
        const userIds = await getNonAdminUserIds();

        const [payments, progress, quizAttempts, certificates] = await Promise.all([
            Payment.countDocuments({ userId: { $in: userIds } }),
            UserProgress.countDocuments({ userId: { $in: userIds } }),
            UserQuizAttempt.countDocuments({ userId: { $in: userIds } }),
            Certificate.countDocuments({ userId: { $in: userIds } }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                users: userIds.length,
                payments,
                progress,
                quizAttempts,
                certificates,
                confirmPhrase: CONFIRM_PHRASE
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Actually delete all non-admin users and everything derived from them
 * @route   POST /api/admin/data-reset
 * @access  Private/Admin
 */
export const resetTestData = async (req, res, next) => {
    try {
        const { confirm } = req.body;
        if (confirm !== CONFIRM_PHRASE) {
            return res.status(400).json({
                success: false,
                message: `Refusing to run: the confirmation phrase must exactly match "${CONFIRM_PHRASE}".`
            });
        }

        const userIds = await getNonAdminUserIds();

        const [paymentsResult, progressResult, attemptsResult, certsResult, usersResult] = await Promise.all([
            Payment.deleteMany({ userId: { $in: userIds } }),
            UserProgress.deleteMany({ userId: { $in: userIds } }),
            UserQuizAttempt.deleteMany({ userId: { $in: userIds } }),
            Certificate.deleteMany({ userId: { $in: userIds } }),
            User.deleteMany({ _id: { $in: userIds } }),
        ]);

        console.log(`🧹 Test-data reset run by admin ${req.user?.email || req.user?._id}: ${usersResult.deletedCount} users, ${paymentsResult.deletedCount} payments, ${progressResult.deletedCount} progress records, ${attemptsResult.deletedCount} quiz attempts, ${certsResult.deletedCount} certificates deleted.`);

        res.status(200).json({
            success: true,
            message: 'Test data cleared. Course and quiz content were left untouched.',
            data: {
                users: usersResult.deletedCount,
                payments: paymentsResult.deletedCount,
                progress: progressResult.deletedCount,
                quizAttempts: attemptsResult.deletedCount,
                certificates: certsResult.deletedCount,
            }
        });
    } catch (error) {
        next(error);
    }
};
