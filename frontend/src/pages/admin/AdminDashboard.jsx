import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import adminService from '../../services/adminService.js';
import Loader from '../../components/common/Loader.jsx';
import AdminAssessmentManager from './AdminAssessmentManager.jsx';
import { FaUser, FaBook, FaPlus, FaTrash, FaEdit, FaChartLine, FaGraduationCap, FaClipboardList, FaUsers, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuroraBackground } from '../../components/ui/aurora-background';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [paymentAnalytics, setPaymentAnalytics] = useState(null);
    const [deletedUsers, setDeletedUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                // Sequential requests to avoid rate limiting
                const statsData = await adminService.getDashboardStats();

                if (!isMounted) return;
                await new Promise(resolve => setTimeout(resolve, 300));

                const coursesData = await adminService.getAllCourses();

                if (!isMounted) return;
                await new Promise(resolve => setTimeout(resolve, 300));

                const usersData = await adminService.getAllUsers();
                if (!isMounted) return;
                await new Promise(resolve => setTimeout(resolve, 300));

                const analyticsData = await adminService.getPaymentAnalytics().catch(() => null);
                if (!isMounted) return;
                await new Promise(resolve => setTimeout(resolve, 300));

                const deletedData = await adminService.getDeletedUsers().catch(() => ({ data: [] }));
                if (!isMounted) return;

                setStats(statsData?.data || null);
                setCourses(coursesData.data || []);
                setUsers(usersData.data || []);
                setPaymentAnalytics(analyticsData?.data || null);
                setDeletedUsers(deletedData.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                if (error.response?.status === 429) {
                    toast.error('Too many requests. Please wait a moment...');
                } else {
                    toast.error('Failed to load dashboard data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await adminService.deleteCourse(id);
                setCourses(courses.filter(c => c._id !== id));
                toast.success('Course deleted');
            } catch (error) {
                toast.error('Failed to delete course');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure? This will delete the user and their progress.')) {
            try {
                await adminService.deleteUser(id);
                setUsers(users.filter(u => u._id !== id));
                // Refresh deleted users as well
                const deletedData = await adminService.getDeletedUsers().catch(() => ({ data: [] }));
                setDeletedUsers(deletedData.data || []);
                toast.success('User moved to Principals log');
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handlePermanentlyDeleteUser = async (id) => {
        if (window.confirm('⚠️ ATTENTION: This action is IRREVERSIBLE. All identity records, course progress, and invoices will be purged. Proceed?')) {
            try {
                await adminService.permanentlyDeleteUser(id);
                setDeletedUsers(deletedUsers.filter(u => u._id !== id));
                toast.success('User identity permanently purged');
            } catch (error) {
                toast.error('System failure: Could not purge identity');
            }
        }
    };

    if (loading) return <Loader />;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
        { id: 'revenue', label: 'Revenue ', icon: <FaChartLine /> },
        { id: 'courses', label: 'Courses', icon: <FaBook /> },
        { id: 'assessments', label: 'Assessments', icon: <FaClipboardList /> },
        { id: 'users', label: 'Users', icon: <FaUser /> },
        { id: 'principals', label: 'Principals', icon: <FaClipboardList /> },
    ];

    return (
        <AuroraBackground beige className="min-h-screen selection:bg-amber-500/30 pt-28 pb-12">
            <div className="container mx-auto px-6 py-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
                            <span className="text-amber-600">⚡</span> Admin console
                        </h1>
                        <p className="text-slate-600 mt-2 font-medium">Manage your platform, analyze you revenue, and control users.</p>
                    </div>
                    <Link to="/dashboard" className="btn bg-[#0F172A] hover:bg-[#1E293B] text-slate-300 border border-slate-800 px-6 py-2.5 rounded-xl transition-all shadow-sm font-bold">
                        ← Back to My Dashboard
                    </Link>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white/50 p-2 rounded-2xl border border-[var(--card-border)] shadow-xl shadow-black/5 w-fit backdrop-blur-xl">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'text-slate-500 hover:text-amber-600 hover:bg-white/80'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && stats && stats.overview && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Users"
                                    value={stats.overview.totalUsers || 0}
                                    icon={<FaUser />}
                                    gradient="from-blue-500 to-indigo-600"
                                />
                                <StatCard
                                    title="Total Courses"
                                    value={stats.overview.totalCourses || 0}
                                    icon={<FaBook />}
                                    gradient="from-emerald-500 to-teal-600"
                                />
                                <StatCard
                                    title="Enrollments"
                                    value={stats.overview.totalEnrollments || 0}
                                    icon={<FaGraduationCap />}
                                    gradient="from-violet-500 to-purple-600"
                                />
                                <StatCard
                                    title="Published"
                                    value={stats.overview.publishedCourses || 0}
                                    icon={<FaBook />}
                                    gradient="from-orange-500 to-amber-600"
                                />
                            </div>

                            {/* Main Content Split */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Popular Courses */}
                                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
                                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <FaChartLine />
                                        </div>
                                        Popular Courses
                                    </h3>
                                    <div className="space-y-4">
                                        {stats.popularCourses && stats.popularCourses.length > 0 ? (
                                            stats.popularCourses.map((course, idx) => (
                                                <div key={course._id || idx} className="group flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all duration-300">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-xl border border-slate-100 shadow-sm">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">{course.title || 'Untitled'}</h4>
                                                            <p className="text-sm text-slate-500 font-medium">{course.category || 'General'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                                                        <FaUser className="text-xs text-slate-400" />
                                                        <span className="font-black text-indigo-600">{course.enrollmentCount || 0}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 text-slate-400 font-medium">
                                                No course data available yet.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Actions / Summary */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
                                        <h3 className="text-xl font-black text-slate-900 mb-6">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <button onClick={() => navigate('/admin/courses/new')} className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                                                <FaPlus /> Create New Course
                                            </button>
                                            <button onClick={() => setActiveTab('assessments')} className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-200">
                                                <FaClipboardList /> Manage Assessments
                                            </button>
                                        </div>
                                    </div>

                                    {/* System Status or simple info */}
                                    <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
                                        <h3 className="text-xl font-black text-slate-900 mb-6">Platform Pulse</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-bold">Node Status</span>
                                                <span className="text-emerald-500 flex items-center gap-1.5 font-black uppercase text-xs tracking-widest">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    Operational
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-bold">Database Nexus</span>
                                                <span className="text-emerald-500 font-black uppercase text-xs tracking-widest">Connected</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-500 font-bold">Core Version</span>
                                                <span className="text-slate-900 font-black text-xs font-mono">v1.2.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Revenue & Intelligence Tab */}
                    {activeTab === 'revenue' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Glassmorphism KPI Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <GlassStatCard
                                    title="Total Revenue"
                                    value={`$${paymentAnalytics?.totalRevenue?.toLocaleString() || 0}`}
                                    icon={<FaChartLine />}
                                />
                                <GlassStatCard
                                    title="Transactions"
                                    value={paymentAnalytics?.totalTransactions || 0}
                                    icon={<FaClipboardList />}
                                />
                                <GlassStatCard
                                    title="Avg Checkout Rate"
                                    value={paymentAnalytics?.conversionMetrics?.checkoutConversionRate || '0%'}
                                    icon={<FaUsers />}
                                />
                                <GlassStatCard
                                    title="Avg Order Value"
                                    value={`$${paymentAnalytics?.totalTransactions > 0 ? (paymentAnalytics.totalRevenue / paymentAnalytics.totalTransactions).toFixed(0) : 0}`}
                                    icon={<FaGraduationCap />}
                                />
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Revenue Heatmap (Left Column) */}
                                <div className="xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--card-border)] shadow-sm">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                            <FaChartLine />
                                        </div>
                                        Revenue Trajectory
                                    </h3>
                                    <p className="text-slate-500 mb-8 font-medium">Daily transaction volume (Last 30 Days)</p>

                                    {paymentAnalytics?.dailyRevenue && paymentAnalytics.dailyRevenue.length > 0 ? (
                                        <div className="h-64 flex items-end gap-2 overflow-x-auto pb-4 no-scrollbar">
                                            {paymentAnalytics.dailyRevenue.map((day, idx) => {
                                                const maxRev = Math.max(...paymentAnalytics.dailyRevenue.map(d => d.revenue));
                                                const heightPct = maxRev > 0 ? (day.revenue / maxRev) * 100 : 0;
                                                return (
                                                    <div key={idx} className="flex flex-col items-center justify-end flex-shrink-0 group w-12 h-full">
                                                        <div
                                                            className="w-full bg-gradient-to-t from-orange-600/50 to-amber-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all relative cursor-pointer"
                                                            style={{ height: `${Math.max(5, heightPct)}%` }}
                                                        >
                                                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] py-1 px-2 rounded font-mono border border-slate-700 whitespace-nowrap z-10 pointer-events-none transition-opacity">
                                                                {format(parseISO(day.date), 'MMM d')}: ${day.revenue}
                                                            </div>
                                                        </div>
                                                        <div className="text-[9px] text-slate-500 mt-2 font-mono">{format(parseISO(day.date), 'dd')}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-xl">
                                            <p className="text-slate-500 font-mono text-sm">Awaiting initial transaction signals...</p>
                                        </div>
                                    )}
                                </div>

                                {/* Conversion Funnel & Top Courses (Right Column) */}
                                <div className="space-y-8">
                                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--card-border)] shadow-sm relative overflow-hidden">
                                        {/* Decorative flare */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                                        <h3 className="text-xl font-black text-slate-900 mb-6">Course Sales Ranking</h3>
                                        <div className="space-y-4 relative z-10">
                                            {paymentAnalytics?.revenueByCourse && paymentAnalytics.revenueByCourse.length > 0 ? (
                                                paymentAnalytics.revenueByCourse.map((rc, idx) => (
                                                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                        <div className="flex-1 min-w-0 pr-4">
                                                            <div className="text-sm font-bold text-slate-700 truncate">{rc.courseTitle}</div>
                                                            <div className="text-xs text-amber-600 font-mono mt-1">{rc.sales} transactions</div>
                                                        </div>
                                                        <div className="font-black text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-sm">
                                                            ${rc.revenue}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-slate-500 text-sm italic">No course purchases registered.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Enrollment Details */}
                                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--card-border)] shadow-sm">
                                        <h3 className="text-xl font-black text-slate-900 mb-6">Enrollment Details</h3>

                                        <div className="space-y-5">
                                            <div>
                                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                                                    <span>Visits ➔ Checks</span>
                                                    <span className="text-emerald-600 font-mono">{paymentAnalytics?.conversionMetrics?.totalCheckoutsInitiated || 0}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-slate-300 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                                                    <span>Checks ➔ Pay</span>
                                                    <span className="text-emerald-600 font-mono">{paymentAnalytics?.conversionMetrics?.checkoutConversionRate || '0%'}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: paymentAnalytics?.conversionMetrics?.checkoutConversionRate || '0%' }}></div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                                                    If checking ➔ paying drop-off is high, refine pricing psychology or streamline checkout descriptions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <RevenueCalendar
                                monthlyRevenue={paymentAnalytics?.monthlyRevenue}
                                currentYear={new Date().getFullYear()}
                            />
                        </div>
                    )}

                    {/* Courses Tab */}
                    {activeTab === 'courses' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900">Course Cards</h2>
                                    <p className="text-slate-500 mt-1 font-medium">Architect your learning experiences</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate('/admin/courses/json')}
                                        className="btn bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-2 border border-slate-200 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                                    >
                                        <FaPlus /> JSON Import
                                    </button>
                                    <button
                                        onClick={() => navigate('/admin/courses/new')}
                                        className="btn bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100"
                                    >
                                        <FaPlus /> New Course
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
                                            <tr>
                                                <th className="px-8 py-5">Course Structure</th>
                                                <th className="px-8 py-5">Category</th>
                                                <th className="px-8 py-5">Enrollement Count</th>
                                                <th className="px-8 py-5">Clearance</th>
                                                <th className="px-8 py-5 text-right">Directives</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {courses && courses.length > 0 ? (
                                                courses.map(course => (
                                                    <tr key={course._id || course.id} className="hover:bg-slate-50/50 transition-colors group">
                                                        <td className="px-8 py-6 font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{course.title || 'Untitled'}</td>
                                                        <td className="px-8 py-6 text-slate-500 font-bold text-sm uppercase">{course.category || 'Uncategorized'}</td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-2 font-black text-slate-900">
                                                                <FaUser className="text-xs text-indigo-400" />
                                                                {course.enrollmentCount || 0}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${course.isPublished
                                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                                                                }`}>
                                                                {course.isPublished ? 'Published' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex justify-end gap-3">
                                                                <AdminActionButton
                                                                    onClick={() => navigate(`/courses/${course._id || course.id}/learn?preview=true`)}
                                                                    icon={<FaEye />}
                                                                    color="blue"
                                                                    title="Sync Preview"
                                                                />
                                                                <AdminActionButton
                                                                    onClick={() => navigate(`/admin/courses/${course._id || course.id}/enrollments`)}
                                                                    icon={<FaUsers />}
                                                                    color="emerald"
                                                                    title="View Nodes"
                                                                />
                                                                <AdminActionButton
                                                                    onClick={() => navigate(`/admin/courses/${course._id || course.id}/edit`)}
                                                                    icon={<FaEdit />}
                                                                    color="indigo"
                                                                    title="Modify Matrix"
                                                                />
                                                                <AdminActionButton
                                                                    onClick={() => handleDeleteCourse(course._id || course.id)}
                                                                    icon={<FaTrash />}
                                                                    color="red"
                                                                    title="Terminate"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                                        <FaBook className="mx-auto h-16 w-16 opacity-10 mb-6" />
                                                        Zero Matrices Detected
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Assessments Tab */}
                    {activeTab === 'assessments' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <AdminAssessmentManager />
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
                                <h2 className="text-3xl font-black text-slate-900">Entity Registry</h2>
                                <p className="text-slate-500 mt-1 font-medium">All Users Information</p>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
                                            <tr>
                                                <th className="px-8 py-5">Identify</th>
                                                <th className="px-8 py-5">genaicourse ID</th>
                                                <th className="px-8 py-5">Security Role</th>
                                                <th className="px-8 py-5 text-amber-600 font-black italic underline decoration-amber-500/30">Sign up date</th>
                                                <th className="px-8 py-5 text-right">Directives</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users && users.length > 0 ? (
                                                users.map(u => (
                                                    <tr key={u._id || u.id} className="hover:bg-slate-50/50 transition-colors group">
                                                        <td className="px-8 py-6 font-bold text-slate-900 flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                                {u.name ? u.name.charAt(0).toUpperCase() : '?'}
                                                            </div>
                                                            {u.name || 'Unknown'}
                                                        </td>
                                                        <td className="px-8 py-6 text-slate-500 font-bold text-sm">{u.email || 'No email'}</td>
                                                        <td className="px-8 py-6">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin'
                                                                ? 'bg-purple-50 text-purple-600 border border-purple-100'
                                                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                                }`}>
                                                                {u.role || 'user'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-xs font-black text-slate-400 font-mono">
                                                            <div className="flex flex-col">
                                                                <span className="text-slate-900">{u.createdAt ? format(new Date(u.createdAt), 'MMM dd, yyyy') : '-'}</span>
                                                                <span className="text-[9px] opacity-60 uppercase tracking-tighter">Verified Entry</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            {u.role !== 'admin' && (
                                                                <div className="flex justify-end">
                                                                    <AdminActionButton
                                                                        onClick={() => handleDeleteUser(u._id || u.id)}
                                                                        icon={<FaTrash />}
                                                                        color="red"
                                                                        title="Delete"
                                                                    />
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                                        <FaUser className="mx-auto h-16 w-16 opacity-10 mb-6" />
                                                        Registry Empty
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Principals Tab (Deleted Users Log) */}
                    {activeTab === 'principals' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                    <span className="text-slate-400">🛡️</span> Admin Principals
                                </h2>
                                <p className="text-slate-500 mt-1 font-medium italic">Audit log of deactivated identities and historical records.</p>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                            <tr>
                                                <th className="px-8 py-5">Historical Identity</th>
                                                <th className="px-8 py-5">Origin (Sign up)</th>
                                                <th className="px-8 py-5 text-red-600">Termination (Delete Date)</th>
                                                <th className="px-8 py-5">Audit Status</th>
                                                <th className="px-8 py-5 text-right">Records Directive</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {deletedUsers && deletedUsers.length > 0 ? (
                                                deletedUsers.map(du => (
                                                    <tr key={du._id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-900">{du.name}</span>
                                                                <span className="text-xs text-slate-500 font-mono">{du.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-xs font-bold text-slate-600">
                                                            {du.createdAt ? format(new Date(du.createdAt), 'MMM dd, yyyy') : '-'}
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col">
                                                                <span className="text-red-600 font-black text-sm">{du.deletedAt ? format(new Date(du.deletedAt), 'MMM dd, yyyy') : '-'}</span>
                                                                <span className="text-[9px] text-red-400 uppercase font-black tracking-widest">Final deactivation</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-tighter">
                                                                Archived
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <AdminActionButton
                                                                onClick={() => handlePermanentlyDeleteUser(du._id)}
                                                                icon={<FaTrash />}
                                                                color="red"
                                                                title="Purge Permanently"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                                        No deactivation records found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuroraBackground>
    );
};

const GlassStatCard = ({ title, value, icon }) => {
    return (
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--card-border)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">{title}</p>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-2xl shadow-lg border border-amber-100 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, gradient }) => {
    return (
        <div className="relative group overflow-hidden bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-100 text-slate-900">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity blur-2xl`}></div>

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-3">{title}</p>
                    <h3 className="text-5xl font-black tracking-tighter">{value}</h3>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

const AdminActionButton = ({ onClick, icon, color, title }) => {
    const colorClasses = {
        blue: 'text-blue-500 hover:bg-blue-50 hover:border-blue-200',
        emerald: 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200',
        indigo: 'text-indigo-500 hover:bg-indigo-50 hover:border-indigo-200',
        red: 'text-red-500 hover:bg-red-50 hover:border-red-200',
    };

    return (
        <button
            onClick={onClick}
            className={`p-2.5 rounded-xl border border-transparent transition-all duration-300 transform hover:scale-110 ${colorClasses[color]}`}
            title={title}
        >
            {React.cloneElement(icon, { size: 18 })}
        </button>
    );
};

const RevenueCalendar = ({ monthlyRevenue }) => {
    const defaultYear = new Date().getFullYear();
    const availableYears = monthlyRevenue && monthlyRevenue.length > 0
        ? [...new Set(monthlyRevenue.map(m => m.year))].sort((a, b) => b - a)
        : [defaultYear];

    const [selectedYear, setSelectedYear] = useState(availableYears[0] || defaultYear);
    const [selectedMonth, setSelectedMonth] = useState(null); // null means year

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Filter data by selected year
    const yearData = (monthlyRevenue || []).filter(item => item.year === selectedYear);
    const yearTotal = yearData.reduce((sum, item) => sum + item.revenue, 0);

    let displayRevenue = 0;
    let displayTitle = '';

    if (selectedMonth === null) {
        displayRevenue = yearTotal;
        displayTitle = `${selectedYear} Total Revenue`;
    } else {
        const monthData = yearData.find(m => m.month === selectedMonth + 1);
        displayRevenue = monthData ? monthData.revenue : 0;
        displayTitle = `${months[selectedMonth]} ${selectedYear} Revenue`;
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[var(--card-border)] shadow-sm mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <FaCalendarAlt />
                        </div>
                        Revenue Calendar
                    </h3>

                    {/* YEAR SELECTOR */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {availableYears.map(year => (
                            <button
                                key={year}
                                onClick={() => {
                                    setSelectedYear(year);
                                    setSelectedMonth(null);
                                }}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${selectedYear === year
                                    ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-amber-600'
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{displayTitle}</p>
                    <p className="text-3xl font-black text-amber-600">${displayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 mt-2">
                <button
                    onClick={() => setSelectedMonth(null)}
                    className={`w-full lg:w-32 py-3 overflow-hidden rounded-xl font-bold transition-all border shrink-0 ${selectedMonth === null
                        ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-amber-600'
                        }`}
                >
                    {selectedYear}
                </button>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 flex-grow">
                    {months.map((month, idx) => {
                        const hasRevenue = yearData.find(m => m.month === idx + 1);
                        return (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(idx)}
                                className={`py-3 rounded-xl font-bold text-sm transition-all border relative overflow-hidden ${selectedMonth === idx
                                    ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-amber-600'
                                    }`}
                            >
                                <span className="relative z-10">{month}</span>
                                {hasRevenue && selectedMonth !== idx && (
                                    <div className="absolute inset-0 bg-amber-500/10 z-0"></div>
                                )}
                                {hasRevenue && (
                                    <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${selectedMonth === idx ? 'bg-black' : 'bg-amber-500'}`}></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
