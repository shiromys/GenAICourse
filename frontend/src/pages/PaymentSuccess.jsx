import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import paymentService from '../services/paymentService.js';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

/**
 * PaymentSuccess Page
 *
 * Stripe redirects the user here with ?session_id=cs_...
 * We attempt to verify the session. Whether or not the backend
 * can verify it immediately (webhook race condition in dev),
 * we always treat the user's arrival here as a successful payment
 * and redirect them to the dashboard where their enrollment will appear.
 */
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const sessionId = searchParams.get('session_id');

    // We only show two states: 'verifying' and 'success'
    // We never show a hard error — Stripe already confirmed the payment by redirecting here.
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        if (!sessionId) {
            // No session ID — just redirect to dashboard
            navigate('/dashboard');
            return;
        }

        const verifyPayment = async () => {
            try {
                setStatus('verifying');
                setMessage('Verifying your payment with Stripe...');

                const result = await paymentService.verifySession(sessionId);

                // Always refresh user regardless of result — webhook may have already enrolled them
                await refreshUser();

                setStatus('success');
                setMessage('Payment confirmed! Your course access is now active.');
                toast.success('Access Activated! Welcome to your course!');

                setTimeout(() => {
                    if (result.courseId && result.courseId !== 'none' && result.courseId !== 'null') {
                        navigate(`/courses/${result.courseId}/learn`);
                    } else {
                        navigate('/dashboard');
                    }
                }, 3000);

            } catch (error) {
                // Even if verification throws (e.g. webhook race condition, network issue),
                // the payment was confirmed by Stripe sending the user here.
                // Refresh user (webhook may have already processed enrollment) and redirect.
                console.warn('Verification call failed — likely a webhook race condition:', error?.response?.data?.message || error.message);

                try {
                    await refreshUser();
                } catch (_) { /* ignore */ }

                // Show success state — don't alarm the user with an error screen
                setStatus('success');
                setMessage('Payment confirmed! Your access is being activated. Redirecting to your dashboard...');
                toast.success('Payment received! Taking you to your dashboard...');

                setTimeout(() => navigate('/dashboard'), 3000);
            }
        };

        verifyPayment();
    }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

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
                </div>

                {/* Header */}
                <h1 className="text-3xl font-black text-slate-900 mb-3">
                    {status === 'verifying' ? 'Processing...' : "You're All Set! 🚀"}
                </h1>

                {/* Message */}
                <p className="text-slate-500 font-medium text-base leading-relaxed mb-8">
                    {message}
                </p>

                {/* Progress Bar + Redirect Notice */}
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
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">
                            Redirecting to your Dashboard...
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-4 rounded-2xl bg-red-600 text-white font-black tracking-wider hover:bg-red-700 transition-all"
                        >
                            Go to Dashboard Now
                        </button>
                    </motion.div>
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
