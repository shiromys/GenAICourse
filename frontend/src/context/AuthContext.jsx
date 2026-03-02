import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ── Load user from localStorage on mount ──────────────────────────────────
    useEffect(() => {
        const storedUser = authService.getStoredUser();
        const token = authService.getToken();

        if (storedUser && token) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // ── Login ─────────────────────────────────────────────────────────────────
    const login = useCallback(async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.data.user);
        setIsAuthenticated(true);
        return data;
    }, []);

    // ── Register — DO NOT auto-login; redirect to /login instead ─────────────
    const register = useCallback(async (userData) => {
        const data = await authService.register(userData);
        // Intentionally NOT setting user/isAuthenticated here
        // student must log in manually after registration
        return data;
    }, []);

    // ── Logout ────────────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    // ── OAuth callback handler ────────────────────────────────────────────────
    const handleOAuthSuccess = useCallback(async (token) => {
        localStorage.setItem('token', token);
        const data = await authService.getCurrentUser();
        setUser(data.data);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.data));
        return data.data;
    }, []);

    // ── Update user locally (for profile edits etc.) ──────────────────────────
    const updateUser = useCallback((userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }, []);

    /**
     * refreshUser — fetches the latest user profile from the server.
     * ⚠️  CRITICAL: Call this after payment success to pick up new enrolledCourses.
     */
    const refreshUser = useCallback(async () => {
        try {
            const data = await authService.getCurrentUser();
            if (data.success) {
                setUser(data.data);
                localStorage.setItem('user', JSON.stringify(data.data));
                return data.data;
            }
        } catch (error) {
            console.error('❌ Failed to refresh user profile:', error.message);
        }
    }, []);

    // ── Check if user has access to a specific course ─────────────────────────
    const checkCourseAccess = useCallback((courseId) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.hasAllCoursesAccess) return true;

        return user.enrolledCourses?.some(enrollment => {
            const id = enrollment.courseId?._id || enrollment.courseId;
            return id?.toString() === courseId?.toString();
        }) ?? false;
    }, [user]);

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        handleOAuthSuccess,
        updateUser,
        refreshUser,        // ← NEW: use after payment confirmation
        checkCourseAccess,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
