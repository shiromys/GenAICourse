import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import courseService from '@/services/courseService.js';
import Loader from '../components/common/Loader.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGraduationCap, FaTrophy, FaPlay, FaBookOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { getSafeThumbnailUrl } from '../utils/thumbnailHelper.js';

const Dashboard = () => {
    const { user, refreshUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── On mount: detect payment=success in URL and refresh user ──────────────
    useEffect(() => {
        if (searchParams.get('payment') === 'success') {
            // Remove the query param from URL cleanly
            setSearchParams({}, { replace: true });
            // Refresh user profile to pick up the new enrollment
            refreshUser().then(() => {
                fetchEnrolledCourses();
                toast.success('🎉 Access Activated! Your course is now available.', { toastId: 'payment-success' });
            });
        }
    }, []); // run once on mount

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

    if (loading) return <Loader />;

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
            color: 'red',
        },
        {
            label: 'In Progress',
            value: enrolledCourses.filter(c => c?.progressPercentage > 0 && c?.progressPercentage < 100).length,
            icon: <FaPlay size={22} />,
            color: 'emerald',
        },
    ];

    return (
        <div className="section section-pt min-h-screen bg-[var(--bg-main)]">
            <div className="container">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Welcome back</p>
                        <h1 className="text-4xl font-black text-brand tracking-tight">
                            {user?.name?.split(' ')[0]}'s Dashboard
                        </h1>
                    </div>
                    <Link to="/courses" className="btn-premium btn-primary hidden md:flex">
                        Browse Courses
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group card p-8 bg-white border border-gray-100 hover:border-${stat.color}-100 hover:shadow-xl transition-all duration-500 rounded-[2rem] flex items-center shadow-lg shadow-${stat.color}-500/5`}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 transition-transform duration-300 group-hover:scale-110`}>
                                {stat.icon}
                            </div>
                            <div className="ml-6">
                                <div className="text-3xl font-black text-brand mb-0.5">{stat.value}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Course List */}
                <h2 className="text-2xl font-black text-brand mb-6">Continue Learning</h2>

                {enrolledCourses.filter(p => p && p.courseId).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {enrolledCourses.filter(p => p && p.courseId).map((progress, idx) => (
                            <motion.div
                                key={progress._id || idx}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="card p-6 flex flex-col md:flex-row gap-6 items-center bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg transition-shadow"
                            >
                                <div className="w-full md:w-48 h-32 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img
                                        src={getSafeThumbnailUrl(progress.courseId?.thumbnail)}
                                        alt={progress.courseId?.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 w-full">
                                    <h3 className="text-xl font-bold mb-2 text-brand">{progress.courseId?.title}</h3>

                                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                                        <span className="font-semibold">{progress.progressPercentage || 0}% Completed</span>
                                        <span>{progress.completedLessons?.length || 0} Lessons Done</span>
                                    </div>

                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${progress.progressPercentage || 0}%` }}
                                        />
                                    </div>

                                    <Link
                                        to={`/courses/${progress.courseId?._id}/learn`}
                                        className="btn-premium btn-primary inline-flex items-center text-sm px-6 gap-2"
                                    >
                                        <FaPlay size={12} />
                                        {progress.progressPercentage > 0 ? 'Resume Course' : 'Continue Learning'}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200"
                    >
                        <FaBookOpen className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-brand mb-2">No courses yet.</h3>
                        <p className="text-gray-400 mb-6 font-medium">Start your AI learning journey today!</p>
                        <Link to="/courses" className="btn-premium btn-primary">
                            Browse Courses
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
