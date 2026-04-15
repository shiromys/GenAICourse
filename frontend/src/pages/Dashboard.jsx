import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import courseService from '@/services/courseService.js';
import paymentService from '@/services/paymentService.js';
import Loader from '../components/common/Loader.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGraduationCap, FaTrophy, FaPlay, FaBookOpen, FaRotateLeft, FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getSafeThumbnailUrl } from '../utils/thumbnailHelper.js';

const Dashboard = () => {
    const { user, refreshUser, updateUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recovering, setRecovering] = useState(false);
    const [recoveryResult, setRecoveryResult] = useState(null); // { recovered, items }

    // ── On mount: detect payment=success in URL and refresh user ──────────────
    useEffect(() => {
        if (searchParams.get('payment') === 'success') {
            setSearchParams({}, { replace: true });
            refreshUser().then(() => {
                fetchEnrolledCourses();
                toast.success('🎉 Access Activated! Your course is now available.', { toastId: 'payment-success' });
            });
        }
    }, [searchParams, setSearchParams, refreshUser]);

    // ── Fetch enrolled course progress details ─────────────────────────────────
    const fetchEnrolledCourses = useCallback(async () => {
        setLoading(true);
        try {
            const result = await courseService.getEnrolledCourses();
            if (result.success && result.data && result.data.courses) {
                setEnrolledCourses(result.data.courses);
            } else {
                setEnrolledCourses([]);
            }
        } catch (error) {
            console.error('Failed to fetch enrolled courses:', error);
            toast.error('Could not load course progress');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEnrolledCourses();
    }, [fetchEnrolledCourses]);

    // ── Recovery: scan Stripe for missed payments ──────────────────────────────
    const handleRecoverPayments = useCallback(async (silent = false) => {
        if (recovering) return;
        setRecovering(true);
        setRecoveryResult(null);
        try {
            const result = await paymentService.recoverPayments();
            setRecoveryResult({ recovered: result.recovered, items: result.items });

            if (result.recovered > 0) {
                // Update local auth context with recovered data
                if (result.user) updateUser(result.user);
                await fetchEnrolledCourses();
                toast.success(
                    `✅ ${result.recovered} purchase${result.recovered > 1 ? 's' : ''} restored! Welcome to your course.`,
                    { autoClose: 5000 }
                );
            } else if (!silent) {
                toast.info('All your purchases are already active.', { autoClose: 3000 });
            }
        } catch (err) {
            console.error('Recovery failed:', err);
            if (!silent) toast.error('Check failed. Please try again or contact support.');
        } finally {
            setRecovering(false);
        }
    }, [recovering, updateUser, fetchEnrolledCourses]);

    if (loading) return <Loader />;

    const hasNoRecentAccess = !user?.hasAllCoursesAccess && enrolledCourses.length === 0;

    const stats = [
        {
            label: 'Enrolled Courses',
            value: user?.hasAllCoursesAccess ? 'All Access' : (user?.enrolledCourses?.length || 0),
            icon: <FaGraduationCap size={26} />,
            color: 'indigo',
        },
        {
            label: 'Completed',
            value: enrolledCourses.filter(c => c?.progressPercentage === 100).length,
            icon: <FaTrophy size={26} />,
            color: 'rose',
        },
        {
            label: 'In Progress',
            value: enrolledCourses.filter(c => c?.progressPercentage > 0 && c?.progressPercentage < 100).length,
            icon: <FaPlay size={22} />,
            color: 'emerald',
        },
    ];

    return (
        <div className="section section-pt min-h-screen bg-[#FDFCFB]">
            <div className="container py-8 md:py-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Student Dashboard</p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Hey, <span className="text-indigo-600">{user?.name?.split(' ')[0] || 'User'}</span>! 👋
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <button
                            onClick={() => handleRecoverPayments(false)}
                            disabled={recovering}
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        >
                            <FaRotateLeft className={recovering ? 'animate-spin' : ''} />
                            {recovering ? 'Syncing...' : 'Purchase Restore'}
                        </button>
                        <Link to="/courses" className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Browse More
                        </Link>
                    </motion.div>
                </div>

                {/* ── RECOVERY BANNER ─────────────────────────────────────────── */}
                <AnimatePresence>
                    {hasNoRecentAccess && !recoveryResult?.recovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mb-12 rounded-[2rem] bg-amber-50 border border-amber-100 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-amber-500/5"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                <FaTriangleExclamation size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-amber-900 mb-2">Missing your course?</h3>
                                <p className="text-amber-700/80 font-medium leading-relaxed max-w-2xl">
                                    If you completed payment but closed the browser before being redirected,
                                    your access might still be processing. Click below to instantly restore your purchase.
                                </p>
                            </div>
                            <button
                                onClick={() => handleRecoverPayments(false)}
                                disabled={recovering}
                                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {recovering ? 'Verifying...' : 'Restore Access Now'}
                            </button>
                        </motion.div>
                    )}

                    {recoveryResult?.recovered > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-12 rounded-[2rem] bg-emerald-50 border border-emerald-100 p-6 flex items-center gap-5 shadow-xl shadow-emerald-500/5"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                                <FaCircleCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-emerald-900">Success! Purchase Restored</h4>
                                <p className="text-emerald-700 text-sm font-medium">
                                    Found {recoveryResult.recovered} missing payment{recoveryResult.recovered > 1 ? 's' : ''}:
                                    <span className="font-bold ml-1">
                                        {recoveryResult.items?.map(i => i.courseTitle).join(', ')}
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* ────────────────────────────────────────────────────────────── */}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 hover:border-indigo-100 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform duration-500`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enrollment Section */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900">Your Learning Journey</h2>
                </div>

                {enrolledCourses.filter(p => p && p.courseId).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {enrolledCourses.filter(p => p && p.courseId).map((progress, idx) => (
                            <motion.div
                                key={progress._id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row gap-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className="w-full lg:w-48 h-36 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
                                    <img
                                        src={getSafeThumbnailUrl(progress.courseId?.thumbnail)}
                                        alt={progress.courseId?.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                        {progress.courseId?.title}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                            {progress.progressPercentage || 0}%
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress.progressPercentage || 0}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                        />
                                    </div>

                                    <Link
                                        to={`/courses/${progress.courseId?._id}/learn`}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-indigo-600 transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        <FaPlay size={12} className="mr-1" />
                                        {progress.progressPercentage > 0 ? 'Resume Course' : 'Start Learning'}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner"
                    >
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBookOpen size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">No active enrollments</h3>
                        <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
                            You haven't started any courses yet. Let's find something amazing for you to learn!
                        </p>
                        <Link to="/courses" className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                            Browse Courses
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
