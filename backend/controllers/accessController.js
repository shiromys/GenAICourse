import User from '../models/User.js';
import Course from '../models/Course.js';
import UserProgress from '../models/UserProgress.js';
import Quiz from '../models/Quiz.js';
import UserQuizAttempt from '../models/UserQuizAttempt.js';

/**
 * Admin-triggered access overrides — for support cases where a user is locked out of a
 * course they should have (a missed webhook, a support escalation, etc). These mirror what
 * the normal payment flow does (enrollInCourse + explicit UserProgress creation) rather than
 * relying on the app's lazy self-healing path, since a support case shouldn't depend on the
 * user happening to trigger that endpoint again.
 */

/**
 * @desc    Grant a specific user access to a specific course
 * @route   POST /api/admin/users/:id/grant-course
 * @access  Private/Admin
 */
export const grantCourseAccess = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, message: 'courseId is required.' });
        }

        const [user, course] = await Promise.all([
            User.findById(req.params.id),
            Course.findById(courseId).select('title')
        ]);

        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
        if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });

        const alreadyEnrolled = user.isEnrolledInCourse(courseId);
        user.enrollInCourse(courseId);
        await user.save();

        const existingProgress = await UserProgress.findOne({ userId: user._id, courseId });
        if (!existingProgress) {
            await UserProgress.create({ userId: user._id, courseId });
        }

        res.status(200).json({
            success: true,
            message: alreadyEnrolled
                ? `${user.name} already had access to "${course.title}" — progress record confirmed.`
                : `Granted ${user.name} access to "${course.title}".`
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Grant a user one additional attempt on a specific course's assessment,
 *          once they've used up the quiz's normal maxAttempts. Each call adds a
 *          separate, individually auditable grant (who, when, why) rather than
 *          bumping a counter — see UserProgress.quizAttemptGrants.
 * @route   POST /api/admin/users/:id/grant-quiz-attempt
 * @access  Private/Admin
 */
export const grantQuizAttempt = async (req, res, next) => {
    try {
        const { courseId, reason } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, message: 'courseId is required.' });
        }

        const [user, course] = await Promise.all([
            User.findById(req.params.id).select('name email'),
            Course.findById(courseId).select('title quizId')
        ]);

        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
        if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });
        if (!course.quizId) {
            return res.status(400).json({ success: false, message: `"${course.title}" has no assessment to grant an attempt on.` });
        }

        let progress = await UserProgress.findOne({ userId: user._id, courseId });
        if (!progress) {
            // Shouldn't normally happen (a user would need to be enrolled to have
            // attempted the quiz at all), but create it rather than fail the grant.
            progress = await UserProgress.create({ userId: user._id, courseId });
        }

        progress.grantExtraQuizAttempt(req.user.id, reason);
        await progress.save();

        const [quiz, attemptsUsed] = await Promise.all([
            Quiz.findById(course.quizId).select('maxAttempts'),
            UserQuizAttempt.countDocuments({ userId: user._id, quizId: course.quizId })
        ]);

        const effectiveMaxAttempts = (quiz?.maxAttempts || 3) + progress.quizAttemptGrants.length;
        const attemptsRemaining = effectiveMaxAttempts - attemptsUsed;

        res.status(200).json({
            success: true,
            message: `Granted ${user.name} one additional attempt on "${course.title}" — ${attemptsRemaining} attempt${attemptsRemaining === 1 ? '' : 's'} now available.`
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Grant or revoke all-courses access for a user
 * @route   PUT /api/admin/users/:id/all-access
 * @access  Private/Admin
 */
export const setAllCoursesAccess = async (req, res, next) => {
    try {
        const { hasAllCoursesAccess } = req.body;
        if (typeof hasAllCoursesAccess !== 'boolean') {
            return res.status(400).json({ success: false, message: 'hasAllCoursesAccess (boolean) is required.' });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        user.hasAllCoursesAccess = hasAllCoursesAccess;
        await user.save();

        if (hasAllCoursesAccess) {
            const allCourses = await Course.find({ isPublished: true }).select('_id');
            for (const c of allCourses) {
                const exists = await UserProgress.exists({ userId: user._id, courseId: c._id });
                if (!exists) await UserProgress.create({ userId: user._id, courseId: c._id });
            }
        }

        res.status(200).json({
            success: true,
            message: `All-access ${hasAllCoursesAccess ? 'granted to' : 'revoked from'} ${user.name}.`
        });
    } catch (error) {
        next(error);
    }
};
