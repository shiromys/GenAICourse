import Course from '../models/Course.js';
import UserProgress from '../models/UserProgress.js';
import User from '../models/User.js';
import { containsProfanity } from '../utils/profanityFilter.js';

/**
 * Course Controller
 * Handles all course-related operations
 */

/**
 * @desc    Get all published courses
 * @route   GET /api/courses
 * @access  Public
 */
// Escape user input before it is used inside a $regex (prevents ReDoS / regex injection).
const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Only these fields are ever sent to an anonymous visitor by the catalogue listing.
// WHITELIST (not a blacklist): a field added to the schema later stays private by default.
const PUBLIC_LISTING_FIELDS =
    'title slug description thumbnail category level tags language ' +
    'price currency isFree isPublished enrollmentCount averageRating ratingCount createdAt ' +
    'modules.lessons._id modules.lessons.duration'; // only so lesson count/duration can be computed

export const getCourses = async (req, res, next) => {
    try {
        // Coerce every query-string value to a plain string. Express parses
        // ?category[$ne]=x into an object, which would otherwise reach Mongo as an operator.
        const category = typeof req.query.category === 'string' ? req.query.category : undefined;
        const level = typeof req.query.level === 'string' ? req.query.level : undefined;
        const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 100) : '';

        // Build query
        const query = { isPublished: true };
        if (category) query.category = category;
        if (level) query.level = level;

        if (search) {
            const rx = { $regex: escapeRegex(search), $options: 'i' };
            // Deliberately NOT searching lesson content: a public search over paid lesson
            // text lets anyone confirm/extract content one query at a time.
            query.$or = [{ title: rx }, { description: rx }, { tags: rx }];
        }

        const sortOptions = { createdAt: -1, enrollmentCount: -1, averageRating: -1, title: 1 };
        const sortBy = Object.prototype.hasOwnProperty.call(sortOptions, req.query.sortBy)
            ? req.query.sortBy
            : 'createdAt';

        // Bounded pagination (previously unbounded: ?limit=100000 dumped everything).
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);

        const docs = await Course.find(query)
            .select(PUBLIC_LISTING_FIELDS)
            .sort({ [sortBy]: sortOptions[sortBy] })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();

        // Collapse modules/lessons to two numbers; the curriculum outline is served by
        // GET /api/courses/:id, never by the listing.
        const courses = docs.map(({ modules = [], ...course }) => {
            const lessons = modules.flatMap((m) => m.lessons || []);
            return {
                ...course,
                totalLessons: lessons.length,
                totalDuration: lessons.reduce((sum, l) => sum + (l.duration || 0), 0)
            };
        });

        const total = await Course.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                courses,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
export const getCourse = async (req, res, next) => {
    try {
        const idOrSlug = req.params.id;
        // Check if it's a valid MongoDB ObjectId
        const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };

        const course = await Course.findOne(query)
            // Never populate `email` on a public route: it exposed the creator's and
            // every instructor's email address to anonymous visitors.
            .populate('createdBy', 'name')
            .populate('instructors.userId', 'name profile.avatar')
            .populate('reviews.userId', 'name profile.avatar');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Only show published courses to non-admin users
        if (!course.isPublished && (!req.user || req.user.role !== 'admin')) {
            return res.status(403).json({
                success: false,
                message: 'This course is not available'
            });
        }

        // Full lesson content (body text, downloadable resources, key points,
        // etc.) is the paid product. This route is intentionally public so
        // anyone can browse a course's description/price/curriculum outline
        // before buying — but it was previously returning every lesson's full
        // content to that same anonymous/non-buying visitor, with nothing
        // checking enrollment at all. An enrolled user or an admin still gets
        // everything, exactly as before; everyone else gets the course's public
        // info (title, description, price, reviews) plus each lesson's title
        // and duration (enough to render the curriculum list and advertise
        // course length), with the actual teaching content stripped out.
        const hasFullAccess = !!(
            req.user &&
            (req.user.role === 'admin' || req.user.isEnrolledInCourse(course._id))
        );

        const responseData = course.toObject();

        if (!hasFullAccess) {
            responseData.modules = (responseData.modules || []).map((module) => ({
                ...module,
                lessons: (module.lessons || []).map((lesson) => {
                    const { content, resources, keyPoints, learningObjectives, videoUrl, quizId, ...publicLessonFields } = lesson;
                    return publicLessonFields;
                })
            }));
        }

        res.status(200).json({
            success: true,
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new course (Admin only)
 * @route   POST /api/courses
 * @access  Private/Admin
 */
export const createCourse = async (req, res, next) => {
    try {
        const courseData = {
            ...req.body,
            createdBy: req.user._id
        };

        const course = await Course.create(courseData);

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update course (Admin only)
 * @route   PUT /api/courses/:id
 * @access  Private/Admin
 */
export const updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete course (Admin only)
 * @route   DELETE /api/courses/:id
 * @access  Private/Admin
 */
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await course.deleteOne();

        // Also delete all user progress for this course
        await UserProgress.deleteMany({ courseId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Enroll in a course
 * @route   POST /api/courses/:id/enroll
 * @access  Private
 */
export const enrollCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (!course.isPublished) {
            return res.status(400).json({
                success: false,
                message: 'This course is not available for enrollment'
            });
        }

        // Check if already enrolled
        const existingProgress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        });

        if (existingProgress) {
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course'
            });
        }

        // Create progress record
        await UserProgress.create({
            userId: req.user._id,
            courseId: req.params.id
        });

        // Update user's enrolled courses
        const user = await User.findById(req.user._id);
        user.enrollInCourse(req.params.id);
        await user.save();

        // Increment enrollment count
        course.enrollmentCount += 1;
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Successfully enrolled in course'
        });

        // 🔥 SEND ENROLLMENT EMAIL
        try {
            const { sendEmail } = await import('../services/emailService.js');
            const { enrollmentTemplate } = await import('../utils/email/templates/enrollmentTemplate.js');

            await sendEmail(
                user.email,
                `Enrollment Confirmed: ${course.title} 🎓`,
                enrollmentTemplate(user.name, course.title)
            );
        } catch (emailError) {
            console.error('❌ Failed to send enrollment email:', emailError.message);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get course progress for current user
 * @route   GET /api/courses/:id/progress
 * @access  Private
 */
export const getCourseProgress = async (req, res, next) => {
    try {
        const progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        }).populate('courseId', 'title modules');

        if (!progress) {
            return res.status(200).json({
                success: true,
                data: null,
                message: 'Not enrolled in this course'
            });
        }

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get course completion status (all lessons completed) for assessment gate
 * @route   GET /api/courses/:id/completion-status
 * @access  Private
 */
export const getCourseCompletionStatus = async (req, res, next) => {
    try {
        const progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        });
        const course = await Course.findById(req.params.id).select('modules');
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        const totalLessons = course.modules?.reduce(
            (acc, m) => acc + (m.lessons?.length ?? 0),
            0
        ) ?? 0;
        const completedCount = progress?.completedLessons?.length ?? 0;
        const allLessonsCompleted = totalLessons > 0 && completedCount >= totalLessons;

        res.status(200).json({
            success: true,
            data: { allLessonsCompleted, completedCount, totalLessons }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update course progress
 * @route   PUT /api/courses/:id/progress
 * @access  Private
 */
export const updateCourseProgress = async (req, res, next) => {
    try {
        const { moduleId, lessonId, currentModule, currentLesson } = req.body;

        let progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        });

        // Auto-enroll if not yet enrolled (e.g. user opened /learn without enrolling)
        if (!progress) {
            const courseToEnroll = await Course.findById(req.params.id);
            if (!courseToEnroll) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            if (!courseToEnroll.isPublished) {
                return res.status(400).json({ success: false, message: 'Course is not available' });
            }
            progress = await UserProgress.create({
                userId: req.user._id,
                courseId: req.params.id
            });
            const user = await User.findById(req.user._id);
            user.enrollInCourse(req.params.id);
            await user.save();
            courseToEnroll.enrollmentCount += 1;
            await courseToEnroll.save();
        }

        // Add completed lesson if provided
        if (moduleId && lessonId) {
            const alreadyCompleted = progress.completedLessons.some(
                lesson => lesson.moduleId.toString() === moduleId && lesson.lessonId.toString() === lessonId
            );

            if (!alreadyCompleted) {
                progress.completedLessons.push({ moduleId, lessonId });
            }
        }

        // Update current position
        if (currentModule !== undefined) progress.currentModule = currentModule;
        if (currentLesson !== undefined) progress.currentLesson = currentLesson;

        // Get course to calculate progress
        const course = await Course.findById(req.params.id);
        const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);

        progress.calculateProgress(totalLessons);
        progress.lastAccessedAt = new Date();

        // Check if course is completed
        if (progress.progressPercentage === 100 && !progress.completedAt) {
            progress.completedAt = new Date();
        }

        await progress.save();

        res.status(200).json({
            success: true,
            message: 'Progress updated successfully',
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add review to course
 * @route   POST /api/courses/:id/reviews
 * @access  Private
 */
export const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const courseId = req.params.id;

        if (comment && containsProfanity(comment)) {
            return res.status(400).json({
                success: false,
                message: 'Please remove inappropriate language from your review and try again.'
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if user is enrolled
        const progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: courseId
        });

        if (!progress) {
            return res.status(403).json({
                success: false,
                message: 'You must be enrolled in this course to leave a review'
            });
        }

        // Add review
        await course.addReview(req.user._id, rating, comment);

        // Populate reviewer names/avatars so the response matches what
        // getCourse returns — otherwise every review would show as
        // "Learner" in the UI until the page is reloaded.
        await course.populate('reviews.userId', 'name profile.avatar');

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Remove a review (moderation escape hatch for anything the
 *          profanity filter in addReview() doesn't catch — e.g. harassment
 *          or abuse that isn't a "bad word" but should still come down)
 * @route   DELETE /api/courses/:id/reviews/:reviewId
 * @access  Private/Admin
 */
export const deleteReview = async (req, res, next) => {
    try {
        const { id: courseId, reviewId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const existing = course.reviews.find((r) => r._id.toString() === reviewId);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        course.reviews = course.reviews.filter((r) => r._id.toString() !== reviewId);
        course.ratingCount = course.reviews.length;
        course.averageRating = course.ratingCount > 0
            ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.ratingCount
            : 0;
        await course.save();
        await course.populate('reviews.userId', 'name profile.avatar');

        res.status(200).json({
            success: true,
            message: 'Review removed',
            data: course
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get user's enrolled courses
 * @route   GET /api/courses/enrolled
 * @access  Private
 */
export const getEnrolledCourses = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        // ── SELF-HEALING: Ensure UserProgress exists for all enrolled courses ──
        const user = await User.findById(req.user._id).select('enrolledCourses hasAllCoursesAccess');

        if (user && user.enrolledCourses.length > 0) {
            for (const enrollment of user.enrolledCourses) {
                const cId = enrollment.courseId;
                const progressExists = await UserProgress.exists({ userId: req.user._id, courseId: cId });
                if (!progressExists) {
                    await UserProgress.create({ userId: req.user._id, courseId: cId });
                    console.log(`🛠️ Auto-created missing progress record for course: ${cId}`);
                }
            }
        }

        // If user has all access, optionally ensure progress for ALL courses? 
        // We'll leave it to appear as they open them, or if you want them on dashboard:
        if (user?.hasAllCoursesAccess) {
            const allPublished = await Course.find({ isPublished: true }).select('_id');
            for (const c of allPublished) {
                const exists = await UserProgress.exists({ userId: req.user._id, courseId: c._id });
                if (!exists) await UserProgress.create({ userId: req.user._id, courseId: c._id });
            }
        }

        const userProgress = await UserProgress.find({ userId: req.user._id })
            .populate('courseId', 'title thumbnail category level averageRating')
            .sort({ lastAccessedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Filter by status if provided
        let filteredProgress = userProgress;
        if (status === 'completed') {
            filteredProgress = userProgress.filter(p => p.progressPercentage === 100);
        } else if (status === 'in-progress') {
            filteredProgress = userProgress.filter(p => p.progressPercentage > 0 && p.progressPercentage < 100);
        } else if (status === 'not-started') {
            filteredProgress = userProgress.filter(p => p.progressPercentage === 0);
        }

        const total = await UserProgress.countDocuments({ userId: req.user._id });

        res.status(200).json({
            success: true,
            data: {
                courses: filteredProgress,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add bookmark to lesson
 * @route   POST /api/courses/:id/bookmarks
 * @access  Private
 */
export const addBookmark = async (req, res, next) => {
    try {
        const { moduleId, lessonId, timestamp, note } = req.body;
        const courseId = req.params.id;

        let progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: courseId
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'You are not enrolled in this course'
            });
        }

        const success = progress.addBookmark(moduleId, lessonId, timestamp, note);

        if (!success) {
            return res.status(400).json({
                success: false,
                message: 'Bookmark already exists'
            });
        }

        await progress.save();

        res.status(201).json({
            success: true,
            message: 'Bookmark added successfully',
            data: progress.bookmarks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get course bookmarks
 * @route   GET /api/courses/:id/bookmarks
 * @access  Private
 */
export const getBookmarks = async (req, res, next) => {
    try {
        const progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'You are not enrolled in this course'
            });
        }

        res.status(200).json({
            success: true,
            data: progress.bookmarks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add note to lesson
 * @route   POST /api/courses/:id/notes
 * @access  Private
 */
export const addNote = async (req, res, next) => {
    try {
        const { moduleId, lessonId, content, timestamp } = req.body;
        const courseId = req.params.id;

        let progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: courseId
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'You are not enrolled in this course'
            });
        }

        const newNote = progress.addNote(moduleId, lessonId, content, timestamp);
        await progress.save();

        res.status(201).json({
            success: true,
            message: 'Note added successfully',
            data: newNote
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get course notes
 * @route   GET /api/courses/:id/notes
 * @access  Private
 */
export const getNotes = async (req, res, next) => {
    try {
        const progress = await UserProgress.findOne({
            userId: req.user._id,
            courseId: req.params.id
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'You are not enrolled in this course'
            });
        }

        res.status(200).json({
            success: true,
            data: progress.notes
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get course analytics (instructor/admin only)
 * @route   GET /api/courses/:id/analytics
 * @access  Private (Instructor, Admin)
 */
export const getCourseAnalytics = async (req, res, next) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if user is instructor or admin
        if (course.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view course analytics'
            });
        }

        // Get enrollment and completion data
        const totalEnrollments = await UserProgress.countDocuments({ courseId });
        const completions = await UserProgress.countDocuments({
            courseId,
            progressPercentage: 100
        });
        const inProgress = totalEnrollments - completions;

        // Get average progress
        const progressData = await UserProgress.aggregate([
            { $match: { courseId: course._id } },
            {
                $group: {
                    _id: null,
                    avgProgress: { $avg: '$progressPercentage' },
                    avgTimeSpent: { $avg: '$totalTimeSpent' }
                }
            }
        ]);

        // Get lesson completion data
        const lessonStats = await UserProgress.aggregate([
            { $match: { courseId: course._id } },
            { $unwind: '$completedLessons' },
            {
                $group: {
                    _id: '$completedLessons.lessonId',
                    completionCount: { $sum: 1 }
                }
            },
            { $sort: { completionCount: -1 } }
        ]);

        const analytics = {
            overview: {
                totalEnrollments,
                completions,
                inProgress,
                completionRate: totalEnrollments > 0 ? (completions / totalEnrollments) * 100 : 0,
                averageProgress: progressData[0]?.avgProgress || 0,
                averageTimeSpent: progressData[0]?.avgTimeSpent || 0
            },
            lessonStats,
            ratingStats: {
                averageRating: course.averageRating,
                totalReviews: course.ratingCount
            },
            trendData: {
                enrollmentTrend: await getEnrollmentTrend(courseId),
                completionTrend: await getCompletionTrend(courseId)
            }
        };

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        next(error);
    }
};

// Helper function for enrollment trend
const getEnrollmentTrend = async (courseId) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    return await UserProgress.aggregate([
        { $match: { courseId, enrolledAt: { $gte: thirtyDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$enrolledAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id': 1 } }
    ]);
};

// Helper function for completion trend
const getCompletionTrend = async (courseId) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    return await UserProgress.aggregate([
        { $match: { courseId, completedAt: { $gte: thirtyDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id': 1 } }
    ]);
};

export default {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getCourseProgress,
    getCourseCompletionStatus,
    updateCourseProgress,
    addReview,
    deleteReview,
    getEnrolledCourses,
    addBookmark,
    getBookmarks,
    addNote,
    getNotes,
    getCourseAnalytics
};
