import crypto from 'crypto';
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
 * SAFETY DESIGN (two independent factors, plus a backup, before anything is deleted):
 * 1. A secret key (ADMIN_RESET_KEY) that only lives in the Railway environment, never in the
 *    app or the database — so a stolen/leaked admin login alone is not enough to run this.
 *    Only someone who both has admin access AND knows this out-of-band secret can proceed.
 * 2. A typed confirmation phrase in the UI, checked here (not just client-side), so a
 *    scripted or malformed request can't trigger it by accident even with a valid key.
 * 3. Before the real delete runs, exportResetBackup lets the admin pull a full JSON export of
 *    everything about to be deleted. The frontend always calls this and triggers a browser
 *    download of the result before calling the actual delete endpoint, so there is a copy of
 *    the data on the admin's machine even though this tool has no server-side backup/soft-
 *    delete path of its own.
 *
 * Scope is every User with role !== 'admin' (regardless of isDeleted), plus every record that
 * references one of those user ids. Admin accounts, and Course/Quiz content, are never
 * touched or counted — this tool has no business touching real product content.
 */

const CONFIRM_PHRASE = 'delete all data';

// Constant-time string comparison so checking the secret key doesn't leak timing
// information about how much of it an attacker has guessed correctly.
const safeEqual = (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length === 0 || b.length === 0) {
        return false;
    }
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
};

// Checks req.body.resetKey against process.env.ADMIN_RESET_KEY. Returns a result object
// instead of writing the response directly, so every route that needs this check (verify,
// backup, and the real delete) can share one implementation and one error message.
const checkResetKey = (req) => {
    const configuredKey = process.env.ADMIN_RESET_KEY;
    if (!configuredKey) {
        return { ok: false, status: 503, message: 'ADMIN_RESET_KEY is not configured on this server — refusing to run until it is set.' };
    }
    if (!safeEqual(req.body?.resetKey, configuredKey)) {
        // 403, not 401: the admin IS authenticated (that's already enforced by this whole
        // router's protect+authorize('admin') middleware) — they just didn't supply the
        // extra secret. Using 401 here would trip the app's global axios interceptor, which
        // treats ANY 401 as "your session is stale" and force-logs the admin out entirely —
        // confirmed live: a single wrong key guess hard-redirected to /login and wiped the
        // session, which is not what a wrong secret should do.
        return { ok: false, status: 403, message: 'Incorrect reset key.' };
    }
    return { ok: true };
};

const getNonAdminUserIds = async () => {
    const users = await User.find({ role: { $ne: 'admin' } }).select('_id');
    return users.map(u => u._id);
};

/**
 * @desc    Preview what a test-data reset would delete, without deleting anything.
 *          Does not require the reset key — it's read-only and shows no sensitive data,
 *          just counts, so there's nothing here worth gating behind the second factor.
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
 * @desc    Check the admin reset key alone, before showing the confirm-phrase step in the UI.
 *          Deliberately does nothing else — no data is read or touched — so a wrong key just
 *          fails fast without a round trip that looks or behaves any differently than a
 *          correct one.
 * @route   POST /api/admin/data-reset/verify-key
 * @access  Private/Admin
 */
export const verifyResetKey = async (req, res, next) => {
    try {
        const keyCheck = checkResetKey(req);
        if (!keyCheck.ok) {
            return res.status(keyCheck.status).json({ success: false, message: keyCheck.message });
        }
        res.status(200).json({ success: true, message: 'Reset key accepted.' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Export a full backup of everything a reset would delete, as a downloadable JSON
 *          file. Requires both the reset key and the typed confirm phrase — the same two
 *          checks the real delete requires — so a backup can't be pulled by someone who
 *          couldn't also run the delete itself, and so the frontend can safely chain this
 *          call straight into the delete call using the same credentials.
 *          User records are exported without their password hashes.
 * @route   POST /api/admin/data-reset/backup
 * @access  Private/Admin
 */
export const exportResetBackup = async (req, res, next) => {
    try {
        const keyCheck = checkResetKey(req);
        if (!keyCheck.ok) {
            return res.status(keyCheck.status).json({ success: false, message: keyCheck.message });
        }

        const { confirm } = req.body;
        if (confirm !== CONFIRM_PHRASE) {
            return res.status(400).json({
                success: false,
                message: `Refusing to export: the confirmation phrase must exactly match "${CONFIRM_PHRASE}".`
            });
        }

        const userIds = await getNonAdminUserIds();

        const [users, payments, progress, quizAttempts, certificates] = await Promise.all([
            User.find({ _id: { $in: userIds } }).select('-password').lean(),
            Payment.find({ userId: { $in: userIds } }).lean(),
            UserProgress.find({ userId: { $in: userIds } }).lean(),
            UserQuizAttempt.find({ userId: { $in: userIds } }).lean(),
            Certificate.find({ userId: { $in: userIds } }).lean(),
        ]);

        const backup = {
            exportedAt: new Date().toISOString(),
            exportedBy: req.user?.email || String(req.user?._id || 'unknown-admin'),
            reason: 'Pre-delete backup taken automatically before a wipe-test-data run',
            counts: {
                users: users.length,
                payments: payments.length,
                progress: progress.length,
                quizAttempts: quizAttempts.length,
                certificates: certificates.length,
            },
            users,
            payments,
            progress,
            quizAttempts,
            certificates,
        };

        const filename = `genaicourse-data-reset-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.status(200).json(backup);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Actually delete all non-admin users and everything derived from them.
 *          Requires the reset key AND the exact confirm phrase — both re-checked here, not
 *          trusted from an earlier call, since this is the one step that's actually
 *          destructive.
 * @route   POST /api/admin/data-reset
 * @access  Private/Admin
 */
export const resetTestData = async (req, res, next) => {
    try {
        const keyCheck = checkResetKey(req);
        if (!keyCheck.ok) {
            return res.status(keyCheck.status).json({ success: false, message: keyCheck.message });
        }

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
