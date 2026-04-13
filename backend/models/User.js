import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
            select: false
        },
        // FIXED: Added all valid role values
        role: {
            type: String,
            enum: ['User', 'student', 'instructor', 'admin'],
            default: 'User'
        },
        avatar: {
            type: String,
            default: null
        },
        bio: {
            type: String,
            default: ''
        },
        phoneNumber: {
            type: String,
            default: null
        },
        address: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        zipCode: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        socialLinks: {
            linkedin: { type: String, default: null },
            twitter: { type: String, default: null },
            github: { type: String, default: null },
            portfolio: { type: String, default: null }
        },
        preferences: {
            emailNotifications: { type: Boolean, default: true },
            smsNotifications: { type: Boolean, default: false },
            marketingEmails: { type: Boolean, default: false }
        },
        enrolledCourses: [
            {
                courseId: mongoose.Schema.Types.ObjectId,
                enrolledAt: { type: Date, default: Date.now },
                progressPercentage: { type: Number, default: 0 },
                completedLessons: [mongoose.Schema.Types.ObjectId],
                certificateEarned: Boolean
            }
        ],
        createdCourses: [mongoose.Schema.Types.ObjectId],
        stripe_customer_id: String,
        isVerified: { type: Boolean, default: false },
        verificationToken: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        lastLogin: Date,
        lastLoginAt: Date,
        loginAttempts: { type: Number, default: 0 },
        lockUntil: Date,
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

// ============ MIDDLEWARE: Hash Password ============
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ============ METHOD: Compare Password ============
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ============ METHOD: Get Public Profile ============
UserSchema.methods.getPublicProfile = function () {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        avatar: this.avatar,
        bio: this.bio,
        phoneNumber: this.phoneNumber,
        address: this.address,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        country: this.country,
        socialLinks: this.socialLinks,
        preferences: this.preferences,
        enrolledCourses: this.enrolledCourses,
        isVerified: this.isVerified,
        lastLogin: this.lastLogin,
        lastLoginAt: this.lastLoginAt,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

// ============ INDEX: Email ============
UserSchema.index({ email: 1 });

export default mongoose.model('User', UserSchema);
