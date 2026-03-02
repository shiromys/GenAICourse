import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import paymentService from '../services/paymentService.js';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

/**
 * PaymentSuccess Page
 * 
 * Stripe redirects the user here after a successful checkout session.
 * URL: /payment-success?session_id=cs_test_...
 * 
 * This page:
 * 1. Reads the session_id from the URL
 * 2. Calls the backend to verify & process the payment
 * 3. Refreshes the user context so enrolledCourses is up to date
 * 4. Redirects to /dashboard after 3 seconds
 */
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const sessionId = searchParams.get('session_id');

    const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        if (!sessionId) {
            setStatus('error');
            setMessage('No session ID found. Please contact support.');
            return;
        }

        const verifyPayment = async () => {
            try {
                setStatus('verifying');
                setMessage('Verifying your payment with Stripe...');

                const result = await paymentService.verifySession(sessionId);

                if (result.success) {
                    // ✅ Key step: refresh user context to pick up new enrolledCourses/hasAllCoursesAccess
                    await refreshUser();

                    setStatus('success');
                    setMessage('Payment verified! Your course access is now active.');
                    toast.success('🎉 Access Activated! Welcome to your course!');

                    // Redirect to dashboard after 3 seconds
                    setTimeout(() => navigate('/dashboard'), 3000);
                } else {
                    setStatus('error');
                    setMessage(result.message || 'Verification failed. Please contact support.');
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('error');
                setMessage('Could not verify payment. Please contact support or check your dashboard.');
                // Still refresh — webhook may have processed it already
                await refreshUser();
                toast.warn('Could not verify automatically. Refreshing your dashboard...');
                setTimeout(() => navigate('/dashboard'), 4000);
            }
        };

        verifyPayment();
    }, [sessionId, refreshUser, navigate]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-gray-50 p-12 text-center"
            >
                {/* Status Icon */}
                <div className="flex justify-center mb-8">
                    {status === 'verifying' && (
                        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                            <FaSpinner className="text-blue-500 text-4xl animate-spin" />
                        </div>
                    )}
                    {status === 'success' && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center"
                        >
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
                            <FaExclamationTriangle className="text-red-500 text-4xl" />
                        </div>
                    )}
                </div>

                {/* Header */}
                <h1 className="text-3xl font-black text-slate-900 mb-3">
                    {status === 'verifying' && 'Processing...'}
                    {status === 'success' && 'You\'re All Set! 🚀'}
                    {status === 'error' && 'Heads Up'}
                </h1>

                {/* Message */}
                <p className="text-slate-500 font-medium text-base leading-relaxed mb-8">
                    {message}
                </p>

                {/* CTA */}
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 3, ease: 'linear' }}
                                className="h-full bg-red-600 rounded-full"
                            />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Redirecting to your Dashboard...
                        </p>
                    </motion.div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-4 rounded-2xl bg-red-600 text-white font-black tracking-wider hover:bg-red-700 transition-all"
                        >
                            Go to Dashboard
                        </button>
                        <p className="text-xs text-slate-400">
                            If you were charged and still don't have access,{' '}
                            <span className="text-red-600 font-bold cursor-pointer" onClick={() => navigate('/courses')}>
                                browse courses
                            </span>{' '}
                            or contact support.
                        </p>
                    </div>
                )}

                {/* Branding */}
                <p className="mt-8 text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
                    GENAICOURSE.IO
                </p>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
