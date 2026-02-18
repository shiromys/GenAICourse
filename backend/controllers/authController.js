import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

/**
 * Authentication Controller
 * Handles user registration, login, and profile management
 */

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role = 'student', profile = {} } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Role validation (only admin can create instructor or admin roles)
        let userRole = role;
        if (role !== 'student') {
            const userCount = await User.countDocuments();
            if (userCount > 0) {
                const currentUser = await User.findById(req.user?._id);
                if (!currentUser || currentUser.role !== 'admin') {
                    userRole = 'student';
                }
            } else {
                userRole = 'admin'; // First user becomes admin
            }
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: userRole,
            profile: profile,
            isVerified: userRole === 'admin'
        });

        // 🔥 SEND WELCOME EMAIL
        try {
            const { sendEmail } = await import('../services/emailService.js');
            const { welcomeTemplate } = await import('../utils/email/templates/welcomeTemplate.js');

            await sendEmail(
                user.email,
                'Welcome to GENAICOURSE.IO 🚀',
                welcomeTemplate(user.name)
            );
        } catch (emailError) {
            console.error('❌ Failed to send welcome email:', emailError.message);
        }

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: `${userRole} registered successfully`,
            data: {
                user: user.getPublicProfile(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your account has been deactivated'
            });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        user.lastLoginAt = new Date();
        await user.save();

        // 🔥 SEND LOGIN SECURITY ALERT
        try {
            const { sendEmail } = await import('../services/emailService.js');
            const { loginAlertTemplate } = await import('../utils/email/templates/loginAlertTemplate.js');

            await sendEmail(
                user.email,
                'Security Alert: New Sign-in Detected - GENAICOURSE.IO',
                loginAlertTemplate(user.name)
            );
        } catch (emailError) {
            console.error('❌ Failed to send login alert email:', emailError.message);
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: user.getPublicProfile(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses.courseId', 'title description thumbnail');

        res.status(200).json({
            success: true,
            data: user.getPublicProfile()
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, profile, preferences } = req.body;

        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (email) user.email = email;
        if (profile) user.profile = { ...user.profile, ...profile };
        if (preferences) user.preferences = { ...user.preferences, ...preferences };

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user.getPublicProfile()
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Change password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select('+password');

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Verify email
 * @route   POST /api/auth/verify-email
 * @access  Public
 */
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification token'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/auth/users
 * @access  Private (Admin)
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, role, search } = req.query;

        const query = {};
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                users,
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
 * @desc    Handle OAuth success and redirect to frontend with token
 * @route   GET /api/auth/oauth/success
 * @access  Private (Internal)
 */
export const oauthSuccess = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed'
            });
        }

        const token = generateToken(req.user._id);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        res.redirect(`${frontendUrl}/oauth-callback?token=${token}`);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Forgot Password - Generate reset token and send email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email address'
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        const successMessage = 'If an account exists with this email, you will receive password reset instructions.';

        if (!user) {
            return res.status(200).json({
                success: true,
                message: successMessage
            });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        try {
            const { sendEmail } = await import('../services/emailService.js');
            const { resetPasswordTemplate } = await import('../utils/email/templates/resetPasswordTemplate.js');

            await sendEmail(
                user.email,
                'Password Reset Request - GENAICOURSE.IO',
                resetPasswordTemplate(user.name, resetUrl)
            );

            res.status(200).json({
                success: true,
                message: successMessage
            });

        } catch (emailError) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            console.error('❌ Failed to send password reset email:', emailError);

            return res.status(500).json({
                success: false,
                message: 'Email could not be sent. Please try again later.'
            });
        }

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Reset Password - Validate token and update password
 * @route   PUT /api/auth/reset-password/:resetToken
 * @access  Public
 */
export const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Please provide a new password' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }

        const crypto = await import('crypto');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        try {
            const { sendEmail } = await import('../services/emailService.js');
            const { resetConfirmationTemplate } = await import('../utils/email/templates/resetConfirmationTemplate.js');

            await sendEmail(
                user.email,
                'Password Reset Successful - GENAICOURSE.IO',
                resetConfirmationTemplate(user.name)
            );
        } catch (emailError) {
            console.error('❌ Failed to send confirmation email:', emailError);
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            data: { user: user.getPublicProfile(), token }
        });

    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    getMe,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
    getAllUsers,
    oauthSuccess
};
