import User from '../models/User.js';
import Course from '../models/Course.js';
import UserProgress from '../models/UserProgress.js';
import Payment from '../models/Payment.js';

/**
 * Admin Controller
 * Handles admin-specific operations
 */

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('-password')
            .populate('enrolledCourses', 'title')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get user by ID (Admin only)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('enrolledCourses', 'title description');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get user's progress in all courses
        const progress = await UserProgress.find({ userId: req.params.id })
            .populate('courseId', 'title');

        res.status(200).json({
            success: true,
            data: {
                user,
                progress
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update user role (Admin only)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete user (Admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Don't allow deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        await user.deleteOne();

        // Delete user's progress
        await UserProgress.deleteMany({ userId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all courses including unpublished (Admin only)
 * @route   GET /api/admin/courses
 * @access  Private/Admin
 */
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create new course (Admin only)
 * @route   POST /api/admin/courses
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
 * @route   PUT /api/admin/courses/:id
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
 * @route   DELETE /api/admin/courses/:id
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
 * @desc    Get single course (Admin only)
 * @route   GET /api/admin/courses/:id
 * @access  Private/Admin
 */
export const getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('instructors.userId', 'name email profile');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get dashboard statistics (Admin only)
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        const publishedCourses = await Course.countDocuments({ isPublished: true });
        const totalEnrollments = await UserProgress.countDocuments();

        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get popular courses
        const popularCourses = await Course.find({ isPublished: true })
            .sort({ enrollmentCount: -1 })
            .limit(5)
            .select('title enrollmentCount');

        // Get category distribution
        const categoryStats = await Course.aggregate([
            { $match: { isPublished: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalUsers,
                    totalCourses,
                    publishedCourses,
                    totalEnrollments
                },
                recentUsers,
                popularCourses,
                categoryStats
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Upload course from JSON (Admin only)
 * @route   POST /api/admin/courses/json
 * @access  Private/Admin
 */
export const uploadCourseFromJSON = async (req, res, next) => {
    try {
        const courseData = req.body;

        // Basic validation
        if (!courseData.title || !courseData.description || !courseData.modules || !Array.isArray(courseData.modules)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON Structure: Course must have title, description, and modules array'
            });
        }

        // Normalize Category (Required field in schema)
        const validCategories = ['AI/ML', 'Web Development', 'Data Science', 'Cloud Computing', 'Human Resources', 'Social Impact & Non-profits', 'Other'];

        // If category is not provided or invalid, guess from title/content or default to 'Other'
        if (!courseData.category || !validCategories.includes(courseData.category)) {
            const content = (courseData.title + ' ' + courseData.description).toLowerCase();
            if (content.includes('hr ') || content.includes('human resources') || content.includes('recruitment')) {
                courseData.category = 'Human Resources';
            } else if (content.includes('ai ') || content.includes('machine learning') || content.includes('intelligence')) {
                courseData.category = 'AI/ML';
            } else if (content.includes('web ') || content.includes('javascript') || content.includes('react')) {
                courseData.category = 'Web Development';
            } else {
                courseData.category = 'Other';
            }
        }

        // Normalize Level
        const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate'];
        if (!courseData.level || !validLevels.includes(courseData.level)) {
            courseData.level = 'Beginner';
        }

        // Normalize field names for modules and lessons to match schema
        if (courseData.modules && Array.isArray(courseData.modules)) {
            courseData.modules = courseData.modules.map((module, mIdx) => ({
                title: module.moduleTitle || module.title || `Module ${mIdx + 1}`,
                description: module.description || '',
                order: module.order || mIdx,
                lessons: (module.lessons && Array.isArray(module.lessons))
                    ? module.lessons.map((lesson, lIdx) => ({
                        title: lesson.lessonTitle || lesson.title || `Lesson ${lIdx + 1}`,
                        content: lesson.content || 'No content provided',
                        type: lesson.type || 'text',
                        keyPoints: lesson.keyPoints || [],
                        order: lesson.order || lIdx
                    }))
                    : []
            }));
        }

        // Add metadata
        if (req.user && req.user._id) {
            courseData.createdBy = req.user._id;
        } else {
            const defaultAdmin = await User.findOne({ role: 'admin' });
            if (defaultAdmin) {
                courseData.createdBy = defaultAdmin._id;
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'No administrative account found to assign as course creator.'
                });
            }
        }

        courseData.isPublished = true;

        const course = new Course(courseData);
        await course.save();

        console.log(`✅ Course "${course.title}" published via JSON.`);
        res.status(201).json({
            success: true,
            message: 'Course published successfully',
            data: course
        });
    } catch (error) {
        console.error('❌ JSON Upload Error:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Data Validation Failed: The JSON provided does not meet the course schema requirements.',
                errors: validationErrors
            });
        }
        next(error);
    }
};

/**
 * @desc    Get all students enrolled in a specific course (Admin only)
 * @route   GET /api/admin/courses/:id/enrollments
 * @access  Private/Admin
 */
export const getCourseEnrollments = async (req, res, next) => {
    try {
        const enrollments = await UserProgress.find({ courseId: req.params.id })
            .populate('userId', 'name email profile.avatar')
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get payment analytics and revenue insights (Admin only)
 * @route   GET /api/admin/payments/analytics
 * @access  Private/Admin
 */
export const getPaymentAnalytics = async (req, res, next) => {
    try {
        // 1. Total Revenue & Total Transactions
        const totalAgg = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: "$amountPaid" }, totalTransactions: { $sum: 1 } } }
        ]);
        const totalRevenueResult = totalAgg[0] || { totalRevenue: 0, totalTransactions: 0 };
        const totalRevenue = totalRevenueResult.totalRevenue / 100; // Assuming cents

        // 2. Revenue by Purchase Type
        const byTypeAgg = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: "$purchaseType", revenue: { $sum: "$amountPaid" }, count: { $sum: 1 } } }
        ]);
        const revenueByPurchaseType = byTypeAgg.map(item => ({
            type: item._id,
            revenue: item.revenue / 100,
            count: item.count
        }));

        // 3. Revenue by Course (Top Courses)
        const byCourseAgg = await Payment.aggregate([
            { $match: { status: 'completed', courseId: { $ne: null } } },
            { $group: { _id: "$courseId", revenue: { $sum: "$amountPaid" }, count: { $sum: 1 } } },
            { $sort: { revenue: -1 } },
            { $limit: 10 }
        ]);
        await Course.populate(byCourseAgg, { path: '_id', select: 'title' });
        const revenueByCourse = byCourseAgg.map(item => ({
            courseId: item._id?._id || 'Unknown',
            courseTitle: item._id?.title || 'Unknown/Deleted Course',
            revenue: item.revenue / 100,
            sales: item.count
        }));

        // 4. Daily Revenue (last 30 days) for heatmap
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const dailyAgg = await Payment.aggregate([
            { $match: { status: 'completed', createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$amountPaid" },
                    transactions: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const dailyRevenue = dailyAgg.map(item => ({
            date: item._id,
            revenue: item.revenue / 100,
            transactions: item.transactions
        }));

        // 5. Monthly Revenue (Current Year)
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const monthlyAgg = await Payment.aggregate([
            { $match: { status: 'completed', createdAt: { $gte: startOfYear } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    revenue: { $sum: "$amountPaid" }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        const monthlyRevenue = monthlyAgg.map(item => ({
            month: item._id,
            revenue: item.revenue / 100
        }));

        // 6. Conversion metrics (Mock metrics or inferred from tracking user flow if possible)
        // Without full funnel analytics tracking standard visits, we infer checkout successful vs abandoned
        const totalAttempts = await Payment.countDocuments({});
        const conversionMetrics = {
            totalCheckoutsInitiated: totalAttempts,
            successfulPurchases: totalRevenueResult.totalTransactions,
            checkoutConversionRate: totalAttempts > 0 ? ((totalRevenueResult.totalTransactions / totalAttempts) * 100).toFixed(1) + '%' : '0%'
        };

        res.json({
            success: true,
            data: {
                totalRevenue,
                totalTransactions: totalRevenueResult.totalTransactions,
                monthlyRevenue,
                dailyRevenue,
                revenueByCourse,
                revenueByPurchaseType,
                conversionMetrics
            }
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    uploadCourseFromJSON,
    getDashboardStats,
    getCourseEnrollments,
    getPaymentAnalytics
};
