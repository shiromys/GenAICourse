import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 *
 * Guards the auth endpoints that are most attractive to automate against:
 * credential stuffing / brute force on login, mass account creation on
 * register, and email-bombing or enumeration via forgot-password /
 * resend-verification. Without this, nothing in the app stood between a
 * script and an unlimited number of attempts per minute against any of them.
 */

// Login: the classic brute-force target. Generous enough for a real user who
// mistypes their password a few times, tight enough to make guessing
// impractical (10 tries / 15 min per IP).
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again in a few minutes.'
    }
});

// Registration, forgot-password, and resend-verification are all lower-
// frequency by nature for a legitimate user, and each one sends an email or
// creates an account — so a tighter cap also protects against spam/email-
// bombing a third party's inbox and against user-enumeration probing.
export const authActionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 6,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again in a few minutes.'
    }
});
