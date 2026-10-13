import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import courseService from '@/services/courseService.js';
import paymentService from '@/services/paymentService.js';
import certificateService from '@/services/certificateService.js';
import Loader from '../components/common/Loader.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGraduationCap, FaTrophy, FaPlay, FaBookOpen, FaRotateLeft, FaCircleCheck, FaTriangleExclamation, FaUserPlus, FaXmark, FaAward, FaDownload } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { getSafeThumbnailUrl } from '../utils/thumbnailHelper.js';
import SEOHelmet from '../components/common/SEOHelmet';

const Dashboard = () => {
    const { user, refreshUser, updateUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recovering, setRecovering] = useState(false);
    const [recoveryResult, setRecoveryResult] = useState(null); // { recovered, items }
    const [guestBannerDismissed, setGuestBannerDismissed] = useState(false);
    const [downloadingCertId, setDownloadingCertId] = useState(null);

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

    // ── Certificate: one-click download right from the course card ─────────────
    // Previously the only path was Dashboard → Profile → Certificates tab → find
    // the right one → Download, even though a learner lands back on the Dashboard
    // the moment they finish setting up their account (CompleteAccount.jsx
    // redirects here, and that's exactly when a just-earned certificate becomes
    // downloadable). Surfacing the button where the course already is removes
    // that whole extra hop.
    const handleDownloadCertificate = useCallback(async (certificateId) => {
        if (!certificateId || downloadingCertId) return;
        setDownloadingCertId(certificateId);
        try {
            await certificateService.downloadCertificate(certificateId);
            toast.success('Certificate downloaded!');
        } catch (error) {
            toast.error(error.message || 'Could not download certificate');
        } finally {
            setDownloadingCertId(null);
        }
    }, [downloadingCertId]);

    if (loading) return <Loader />;

    const hasNoRecentAccess = !user?.hasAllCoursesAccess && enrolledCourses.length === 0;
    const readyCertificates = enrolledCourses.filter(p => p && p.courseId && p.certificate);

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
        <div className="section pt-8 min-h-screen bg-[#FDFCFB]">
            {/* ── SEO META ─────────────────────────────────────────── */}
            <SEOHelmet
                title="My AI Learning Dashboard"
                description="View your enrolled AI courses, track your learning progress, and manage your AI certifications on GenAI Course."
                canonical="/dashboard"
                noIndex={true}
            />

            <div className="container py-8 md:py-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">User Dashboard</p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Hey,   <span className="text-blue-600">{user?.name || 'User'}</span>👋
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
                            {recovering ? 'Syncing...' : 'Restore Your Purchase'}
                        </button>
                        <Link to="/courses" className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Browse More
                        </Link>
                    </motion.div>
                </div>

                {/* ── GUEST ACCOUNT SETUP BANNER ──────────────────────────────── */}
                <AnimatePresence>
                    {user?.isGuest && !guestBannerDismissed && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mb-12 rounded-[2rem] bg-blue-50 border border-blue-100 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-blue-500/5 relative"
                        >
                            <button
                                onClick={() => setGuestBannerDismissed(true)}
                                className="absolute top-5 right-5 text-blue-400 hover:text-blue-600 transition-colors"
                                aria-label="Dismiss"
                            >
                                <FaXmark size={16} />
                            </button>
                            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <FaUserPlus size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-blue-900 mb-2">Save your account</h3>
                                <p className="text-blue-700/80 font-medium leading-relaxed max-w-2xl">
                                    You checked out as a guest. Set a name and password so you can log back in from any device —
                                    it's also required before you can download a course certificate.
                                </p>
                            </div>
                            <Link
                                to="/complete-account"
                                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap"
                            >
                                Set Up Account
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── RECOVERY BANNER ─────────────────────────────────────────── */}
                <AnimatePresence>
                    {hasNoRecentAccess && !recoveryResult?.recovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mb-12 rounded-[2rem] bg-blue-50 border border-blue-100 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-blue-500/5"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <FaTriangleExclamation size={32} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-black text-blue-900 mb-2">Missing your course?</h3>
                                <p className="text-blue-700/80 font-medium leading-relaxed max-w-2xl">
                                    If you completed payment but closed the browser before being redirected,
                                    your access might still be processing. Click below to instantly restore your purchase.
                                </p>
                            </div>
                            <button
                                onClick={() => handleRecoverPayments(false)}
                                disabled={recovering}
                                className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
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

                {/* ── CERTIFICATES READY TO DOWNLOAD ──────────────────────────── */}
                {readyCertificates.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 rounded-[2rem] bg-amber-50 border border-amber-100 p-8 shadow-xl shadow-amber-500/5"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                <FaAward size={26} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-amber-900">
                                    {readyCertificates.length === 1 ? 'Your certificate is ready' : `${readyCertificates.length} certificates ready`}
                                </h3>
                                <p className="text-amber-700/80 font-medium text-sm">Download it below — no need to go to your profile.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {readyCertificates.map((progress) => (
                                <div
                                    key={progress._id}
                                    className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-amber-100 px-6 py-4"
                                >
                                    <span className="font-bold text-slate-800 truncate">{progress.courseId?.title}</span>
                                    <button
                                        onClick={() => handleDownloadCertificate(progress.certificate)}
                                        disabled={downloadingCertId === progress.certificate}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wide transition-all active:scale-95 disabled:opacity-50 flex-shrink-0"
                                    >
                                        <FaDownload size={12} />
                                        {downloadingCertId === progress.certificate ? 'Downloading…' : 'Download'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 hover:border-blue-100 transition-all duration-500"
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
                                className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-6 flex flex-col lg:flex-row gap-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className="w-full lg:w-48 h-36 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
                                    <img
                                        src={getSafeThumbnailUrl(progress.courseId?.thumbnail)}
                                        alt={progress.courseId?.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                        {progress.courseId?.title}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                            {progress.progressPercentage || 0}%
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress.progressPercentage || 0}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                                        />
                                    </div>

                                    <Link
                                        to={`/courses/${progress.courseId?._id}/learn`}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
                                    >
                                        <FaPlay size={12} className="mr-1" />
                                        {progress.progressPercentage > 0 ? 'Resume Course' : 'Start Learning'}
                                    </Link>

                                    {progress.certificate && (
                                        <button
                                            onClick={() => handleDownloadCertificate(progress.certificate)}
                                            disabled={downloadingCertId === progress.certificate}
                                            className="flex items-center justify-center gap-2 w-full py-3 mt-2 rounded-2xl bg-amber-50 text-amber-700 font-black text-xs uppercase tracking-wide hover:bg-amber-100 transition-all active:scale-[0.98] disabled:opacity-50"
                                        >
                                            <FaAward size={13} />
                                            {downloadingCertId === progress.certificate ? 'Downloading…' : 'Download Certificate'}
                                        </button>
                                    )}
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
                        <Link to="/courses" className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                            Browse Courses
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
