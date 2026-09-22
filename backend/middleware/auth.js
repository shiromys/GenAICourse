import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */
export const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route. Please login.'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded || !decoded.id) {
                return res.status(401).json({
                    success: false,
                    message: 'Token verification failed: No user ID in payload'
                });
            }

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                console.error(`❌ User not found in DB for ID: ${decoded.id}`);
                return res.status(401).json({
                    success: false,
                    message: `User identity (${decoded.id}) not found or account deactivated`
                });
            }

            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            return res.status(401).json({
                success: false,
                message: `Session invalid: ${error.message}`
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error in authentication'
        });
    }
};

/**
 * Optional Authentication Middleware
 * Same JWT check as `protect`, but never blocks the request when no/invalid
 * token is present — it just proceeds with req.user left unset (undefined).
 * Used on routes that must work for both logged-in users AND guests
 * (e.g. checkout), where the controller decides what to do in each case.
 */
export const optionalAuth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return next();

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded && decoded.id) {
                req.user = await User.findById(decoded.id).select('-password');
            }
        } catch (error) {
            // Invalid/expired token on an optional route — treat as a guest
            // rather than rejecting the request.
        }

        next();
    } catch (error) {
        next();
    }
};

/**
 * Role-based Authorization Middleware
 * Restricts access based on user roles
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route`
            });
        }

        next();
    };
};

/**
 * Generate JWT Token
 */
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};
