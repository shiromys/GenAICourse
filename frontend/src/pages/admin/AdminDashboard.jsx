import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import adminService from '../../services/adminService.js';
import Loader from '../../components/common/Loader.jsx';
import AdminAssessmentManager from './AdminAssessmentManager.jsx';
import {
    FaUser, FaBook, FaPlus, FaTrash, FaEdit, FaChartLine, FaGraduationCap,
    FaClipboardList, FaUsers, FaEye, FaCalendarAlt, FaSearch, FaMoon, FaSun,
    FaBolt, FaHistory, FaThLarge, FaListUl, FaTimes, FaBell, FaLayerGroup,
    FaShieldAlt, FaDollarSign, FaClock, FaFileDownload
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const NAV_ITEMS = [
    { group: 'Overview', items: [
        { id: 'overview', label: 'Overview', icon: FaThLarge },
        { id: 'revenue', label: 'Revenue', icon: FaChartLine },
    ]},
    { group: 'Content', items: [
        { id: 'courses', label: 'Courses', icon: FaBook },
        { id: 'content', label: 'Content Health', icon: FaLayerGroup, badge: 'NEW' },
        { id: 'assessments', label: 'Assessments', icon: FaClipboardList },
    ]},
    { group: 'People', items: [
        { id: 'users', label: 'Users', icon: FaUsers },
        { id: 'audit', label: 'Audit Log', icon: FaHistory },
    ]},
];

const TAB_TITLES = Object.fromEntries(
    NAV_ITEMS.flatMap(g => g.items).map(i => [i.id, i.label])
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [paymentAnalytics, setPaymentAnalytics] = useState(null);
    const [deletedUsers, setDeletedUsers] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [quizPerformance, setQuizPerformance] = useState([]);
    const [courseView, setCourseView] = useState('cards');
    const [dark, setDark] = useState(() => {
        try { return localStorage.getItem('admin-theme') === 'dark'; } catch { return false; }
    });
    const [cmdOpen, setCmdOpen] = useState(false);
    const [cmdQuery, setCmdQuery] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchAll = async () => {
            try {
                const statsData = await adminService.getDashboardStats();
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const coursesData = await adminService.getAllCourses();
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const usersData = await adminService.getAllUsers();
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const analyticsData = await adminService.getPaymentAnalytics().catch(() => null);
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const deletedData = await adminService.getDeletedUsers().catch(() => ({ data: [] }));
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const activityData = await adminService.getRecentActivity().catch(() => ({ data: [] }));
                if (!isMounted) return;
                await new Promise(r => setTimeout(r, 250));

                const quizPerfData = await adminService.getQuizPerformance().catch(() => ({ data: [] }));
                if (!isMounted) return;

                setStats(statsData?.data || null);
                setCourses(coursesData.data || []);
                setUsers(usersData.data || []);
                setPaymentAnalytics(analyticsData?.data || null);
                setDeletedUsers(deletedData.data || []);
                setRecentActivity(activityData.data || []);
                setQuizPerformance(quizPerfData.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                if (error.response?.status === 429) {
                    toast.error('Too many requests. Please wait a moment...');
                } else {
                    toast.error('Failed to load dashboard data');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAll();
        return () => { isMounted = false; };
    }, []);

    // Lightweight polling so the activity feed feels alive without hammering the API
    useEffect(() => {
        const interval = setInterval(() => {
            adminService.getRecentActivity()
                .then(res => setRecentActivity(res.data || []))
                .catch(() => {});
        }, 45000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        try { localStorage.setItem('admin-theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
    }, [dark]);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCmdOpen(true);
            }
            if (e.key === 'Escape') setCmdOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
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
                const deletedData = await adminService.getDeletedUsers().catch(() => ({ data: [] }));
                setDeletedUsers(deletedData.data || []);
                setActiveTab('audit');
                toast.success('User moved to the audit log');
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const handlePermanentlyDeleteUser = async (id) => {
        if (window.confirm('⚠️ This action is IRREVERSIBLE. All identity records, course progress, and invoices will be deleted. Proceed?')) {
            try {
                await adminService.permanentlyDeleteUser(id);
                setDeletedUsers(deletedUsers.filter(u => u._id !== id));
                toast.success('User identity permanently deleted');
            } catch (error) {
                toast.error('Could not delete identity');
            }
        }
    };

    // ---- derived data ----
    const contentStats = useMemo(() => courses.map(c => {
        const modules = c.modules || [];
        let lessonCount = 0, totalDuration = 0, resourceCount = 0;
        modules.forEach(m => (m.lessons || []).forEach(l => {
            lessonCount++;
            totalDuration += l.duration || 0;
            if (l.resources && l.resources.length) resourceCount += l.resources.length;
        }));
        const quiz = quizPerformance.find(q => q.courseTitle === c.title) || null;
        return { id: c._id, title: c.title, moduleCount: modules.length, lessonCount, totalDuration, resourceCount, quiz };
    }), [courses, quizPerformance]);

    const attemptedQuizzes = useMemo(() => quizPerformance.filter(q => q.attempts > 0), [quizPerformance]);
    const lowestPassQuiz = attemptedQuizzes.length > 0 ? attemptedQuizzes[0] : null;

    const revenueDelta = useMemo(() => {
        const daily = paymentAnalytics?.dailyRevenue;
        if (!daily || daily.length < 2) return null;
        const last = daily.slice(-7);
        const prev = daily.slice(-14, -7);
        const lastSum = last.reduce((s, d) => s + d.revenue, 0);
        const prevSum = prev.reduce((s, d) => s + d.revenue, 0);
        if (prevSum <= 0) return null;
        return Math.round(((lastSum - prevSum) / prevSum) * 100);
    }, [paymentAnalytics]);

    const cmdActions = useMemo(() => {
        const actions = [
            { icon: FaPlus, label: 'Create New Course', run: () => navigate('/admin/courses/new') },
            { icon: FaFileDownload, label: 'Import Course JSON', run: () => navigate('/admin/courses/json') },
            ...NAV_ITEMS.flatMap(g => g.items).map(i => ({ icon: i.icon, label: `Jump to ${i.label}`, run: () => setActiveTab(i.id) })),
        ];
        const q = cmdQuery.trim().toLowerCase();
        if (!q) return actions.slice(0, 8);

        const courseMatches = courses
            .filter(c => (c.title || '').toLowerCase().includes(q))
            .slice(0, 5)
            .map(c => ({ icon: FaBook, label: c.title, run: () => setActiveTab('courses') }));
        const userMatches = users
            .filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q))
            .slice(0, 5)
            .map(u => ({ icon: FaUser, label: `${u.name || 'Unknown'} — ${u.email || ''}`, run: () => setActiveTab('users') }));

        return [...actions.filter(a => a.label.toLowerCase().includes(q)), ...courseMatches, ...userMatches].slice(0, 8);
    }, [cmdQuery, courses, users, navigate]);

    if (loading) return <Loader />;

    return (
        <div className={dark ? 'dark' : ''}>
            <div className="min-h-screen flex bg-[#F7F8FA] dark:bg-[#0B1220] transition-colors duration-300">

                {/* ---------------- SIDEBAR ---------------- */}
                <aside className="w-64 flex-shrink-0 bg-[#0F172A] text-slate-400 h-screen sticky top-0 flex flex-col p-4 hidden lg:flex">
                    <div className="flex items-center gap-3 px-2 pb-6">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(37,99,235,.5)]">G</div>
                        <div>
                            <div className="text-white font-black text-sm leading-tight">GenAICourse.IO</div>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 font-bold">Admin Console</div>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto no-scrollbar">
                        {NAV_ITEMS.map(group => (
                            <div key={group.group} className="mb-2">
                                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-600 font-black px-3 pt-3 pb-1.5">{group.group}</div>
                                {group.items.map(item => {
                                    const Icon = item.icon;
                                    const active = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold mb-0.5 transition-all ${
                                                active ? 'bg-blue-500/15 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            {active && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-blue-500 shadow-[0_0_10px_#2563EB]" />}
                                            <Icon size={15} className="flex-shrink-0" />
                                            <span className="truncate">{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white">{item.badge}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    <div className="pt-3 mt-auto border-t border-white/5">
                        <Link to="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-blue-400 transition-colors px-2 mb-3">
                            ← Back to My Dashboard
                        </Link>
                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03]">
                            <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                {(users.find(u => u.role === 'admin')?.name || 'A').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <div className="text-white text-xs font-black truncate">Admin</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Full access</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ---------------- MAIN ---------------- */}
                <div className="flex-1 min-w-0">
                    {/* Topbar */}
                    <div className="sticky top-0 z-30 flex items-center gap-4 px-5 lg:px-8 py-4 bg-white/85 dark:bg-[#111A2E]/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800">
                        <div className="hidden sm:block">
                            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Admin</div>
                            <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{TAB_TITLES[activeTab]}</div>
                        </div>

                        <button
                            onClick={() => setCmdOpen(true)}
                            className="flex-1 max-w-md flex items-center gap-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-400 dark:text-slate-500 text-sm font-semibold hover:border-blue-400 transition-colors"
                        >
                            <FaSearch size={13} />
                            <span className="truncate">Search or jump to...</span>
                            <span className="ml-auto text-[10px] font-black border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5 text-slate-400">⌘K</span>
                        </button>

                        <div className="flex items-center gap-2 ml-auto">
                            <button
                                onClick={() => setDark(d => !d)}
                                title="Toggle theme"
                                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:border-blue-400 hover:text-blue-500 transition-colors"
                            >
                                {dark ? <FaSun size={14} /> : <FaMoon size={14} />}
                            </button>
                            <button className="relative w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300">
                                <FaBell size={14} />
                                {recentActivity.length > 0 && <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />}
                            </button>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-black text-xs">
                                {(users.find(u => u.role === 'admin')?.name || 'A').charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 lg:p-8 max-w-[1400px]">
                        {/* ============ OVERVIEW ============ */}
                        {activeTab === 'overview' && stats?.overview && (
                            <div className="space-y-6 animate-in fade-in duration-300">

                                {lowestPassQuiz ? (
                                    <InsightBanner
                                        title="Lowest quiz pass rate right now"
                                        body={`"${lowestPassQuiz.quizTitle}" (${lowestPassQuiz.courseTitle}) — ${lowestPassQuiz.passRate}% pass rate across ${lowestPassQuiz.attempts} attempt${lowestPassQuiz.attempts === 1 ? '' : 's'}, average score ${lowestPassQuiz.avgScore}%.`}
                                    />
                                ) : (
                                    <InsightBanner
                                        title="No quiz attempts recorded yet"
                                        body="Once learners start taking course assessments, this panel will surface whichever course needs attention first."
                                    />
                                )}

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard
                                        icon={FaUsers} tone="blue" label="Total Users"
                                        value={stats.overview.totalUsers || 0}
                                        delta={stats.trends?.newUsersLast7Days ? `+${stats.trends.newUsersLast7Days} this week` : null}
                                        spark={stats.trends?.dailySignups}
                                    />
                                    <StatCard
                                        icon={FaBook} tone="violet" label="Total Courses"
                                        value={stats.overview.totalCourses || 0}
                                        delta={`${stats.overview.publishedCourses || 0} published`}
                                    />
                                    <StatCard
                                        icon={FaGraduationCap} tone="emerald" label="Enrollments"
                                        value={stats.overview.totalEnrollments || 0}
                                        delta={stats.trends?.newEnrollmentsLast7Days ? `+${stats.trends.newEnrollmentsLast7Days} this week` : null}
                                        spark={stats.trends?.dailyEnrollments}
                                    />
                                    <StatCard
                                        icon={FaDollarSign} tone="amber" label="Revenue (30d)"
                                        value={`$${(paymentAnalytics?.totalRevenue || 0).toLocaleString()}`}
                                        delta={revenueDelta !== null ? `${revenueDelta >= 0 ? '▲' : '▼'} ${Math.abs(revenueDelta)}% vs prior 7d` : null}
                                        deltaTone={revenueDelta !== null && revenueDelta < 0 ? 'down' : 'up'}
                                        spark={(paymentAnalytics?.dailyRevenue || []).slice(-7).map(d => ({ count: d.revenue }))}
                                    />
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
                                    <div className="xl:col-span-2">
                                        <RevenueAreaChart daily={paymentAnalytics?.dailyRevenue} />
                                    </div>
                                    <div className="space-y-5">
                                        <ActivityFeedPanel events={recentActivity} />
                                        <SystemPulsePanel />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ============ REVENUE ============ */}
                        {activeTab === 'revenue' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard icon={FaDollarSign} tone="amber" label="Total Revenue" value={`$${paymentAnalytics?.totalRevenue?.toLocaleString() || 0}`} />
                                    <StatCard icon={FaClipboardList} tone="blue" label="Transactions" value={paymentAnalytics?.totalTransactions || 0} />
                                    <StatCard icon={FaUsers} tone="emerald" label="Checkout Conversion" value={paymentAnalytics?.conversionMetrics?.checkoutConversionRate || '0%'} />
                                    <StatCard icon={FaGraduationCap} tone="violet" label="Avg Order Value" value={`$${paymentAnalytics?.totalTransactions > 0 ? (paymentAnalytics.totalRevenue / paymentAnalytics.totalTransactions).toFixed(0) : 0}`} />
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
                                    <div className="xl:col-span-2">
                                        <RevenueAreaChart daily={paymentAnalytics?.dailyRevenue} tall />
                                    </div>
                                    <Panel title="Course Sales Ranking" icon={FaChartLine}>
                                        <div className="space-y-3">
                                            {paymentAnalytics?.revenueByCourse?.length > 0 ? paymentAnalytics.revenueByCourse.map((rc, idx) => {
                                                const max = Math.max(...paymentAnalytics.revenueByCourse.map(r => r.revenue), 1);
                                                return (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-28 shrink-0 text-[11.5px] font-bold text-slate-700 dark:text-slate-300 truncate">{rc.courseTitle}</div>
                                                        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                                                            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${(rc.revenue / max) * 100}%` }} />
                                                        </div>
                                                        <div className="w-16 shrink-0 text-right text-[11.5px] font-black text-slate-900 dark:text-white">${rc.revenue}</div>
                                                    </div>
                                                );
                                            }) : <EmptyRow text="No course purchases registered." />}
                                        </div>
                                    </Panel>
                                </div>

                                <RevenueCalendar monthlyRevenue={paymentAnalytics?.monthlyRevenue} />
                            </div>
                        )}

                        {/* ============ COURSES ============ */}
                        {activeTab === 'courses' && (
                            <div className="space-y-5 animate-in fade-in duration-300">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Courses</h1>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">Architect your learning experiences</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate('/admin/courses/json')} className="btn bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                                            <FaPlus size={11} /> JSON Import
                                        </button>
                                        <button onClick={() => navigate('/admin/courses/new')} className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25">
                                            <FaPlus size={11} /> New Course
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 rounded-xl p-1 gap-1">
                                        <button onClick={() => setCourseView('cards')} className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 ${courseView === 'cards' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}><FaThLarge size={11} /> Cards</button>
                                        <button onClick={() => setCourseView('table')} className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 ${courseView === 'table' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}><FaListUl size={11} /> Table</button>
                                    </div>
                                    <div className="text-xs font-bold text-slate-400">{courses.length} course{courses.length === 1 ? '' : 's'}</div>
                                </div>

                                {courseView === 'cards' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {courses.map((course, idx) => (
                                            <CourseCard
                                                key={course._id || course.id}
                                                course={course}
                                                gradient={CARD_GRADIENTS[idx % CARD_GRADIENTS.length]}
                                                onPreview={() => navigate(`/courses/${course._id || course.id}/learn?preview=true`)}
                                                onEnrollments={() => navigate(`/admin/courses/${course._id || course.id}/enrollments`)}
                                                onEdit={() => navigate(`/admin/courses/${course._id || course.id}/edit`)}
                                                onDelete={() => handleDeleteCourse(course._id || course.id)}
                                            />
                                        ))}
                                        {courses.length === 0 && <EmptyState icon={FaBook} text="No courses yet." />}
                                    </div>
                                ) : (
                                    <Panel noPad>
                                        <TableWrap>
                                            <thead>
                                                <tr>
                                                    <Th>Course</Th><Th>Category</Th><Th>Enrollments</Th><Th>Status</Th><Th right>Actions</Th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {courses.map(course => (
                                                    <tr key={course._id || course.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group">
                                                        <Td className="font-bold text-slate-900 dark:text-white">{course.title || 'Untitled'}</Td>
                                                        <Td className="text-slate-500 dark:text-slate-400 font-bold">{course.category || 'Uncategorized'}</Td>
                                                        <Td className="font-black text-slate-900 dark:text-white">{course.enrollmentCount || 0}</Td>
                                                        <Td><StatusPill published={course.isPublished} /></Td>
                                                        <Td right>
                                                            <div className="flex justify-end gap-2">
                                                                <IconBtn icon={FaEye} tone="blue" title="Preview" onClick={() => navigate(`/courses/${course._id || course.id}/learn?preview=true`)} />
                                                                <IconBtn icon={FaUsers} tone="emerald" title="Enrollments" onClick={() => navigate(`/admin/courses/${course._id || course.id}/enrollments`)} />
                                                                <IconBtn icon={FaEdit} tone="blue" title="Edit" onClick={() => navigate(`/admin/courses/${course._id || course.id}/edit`)} />
                                                                <IconBtn icon={FaTrash} tone="red" title="Delete" onClick={() => handleDeleteCourse(course._id || course.id)} />
                                                            </div>
                                                        </Td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </TableWrap>
                                        {courses.length === 0 && <EmptyState icon={FaBook} text="No courses yet." />}
                                    </Panel>
                                )}
                            </div>
                        )}

                        {/* ============ CONTENT HEALTH ============ */}
                        {activeTab === 'content' && (
                            <div className="space-y-5 animate-in fade-in duration-300">
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Content Health</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">Depth and assessment quality across every course, at a glance</p>
                                </div>
                                <Panel noPad>
                                    <TableWrap>
                                        <thead>
                                            <tr>
                                                <Th>Course</Th><Th>Modules</Th><Th>Lessons</Th><Th>Duration</Th><Th>Resources</Th><Th>Quiz pass rate</Th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {contentStats.map(c => (
                                                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                                                    <Td className="font-bold text-slate-900 dark:text-white">{c.title}</Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold">{c.moduleCount}</Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold">{c.lessonCount}</Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold">{Math.round(c.totalDuration / 60 * 10) / 10}h</Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold">{c.resourceCount}</Td>
                                                    <Td>
                                                        {c.quiz && c.quiz.attempts > 0 ? (
                                                            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${c.quiz.passRate >= 70 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                                                {c.quiz.passRate}% ({c.quiz.attempts} attempt{c.quiz.attempts === 1 ? '' : 's'})
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs font-bold text-slate-400">No attempts yet</span>
                                                        )}
                                                    </Td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </TableWrap>
                                </Panel>
                            </div>
                        )}

                        {/* ============ ASSESSMENTS ============ */}
                        {activeTab === 'assessments' && (
                            <div className="animate-in fade-in duration-300">
                                <AdminAssessmentManager />
                            </div>
                        )}

                        {/* ============ USERS ============ */}
                        {activeTab === 'users' && (
                            <div className="space-y-5 animate-in fade-in duration-300">
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Users</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">Everyone with an account on the platform</p>
                                </div>
                                <Panel noPad>
                                    <TableWrap>
                                        <thead>
                                            <tr>
                                                <Th>Name</Th><Th>Email</Th><Th>Role</Th><Th>Signed up</Th><Th right>Actions</Th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {users.map(u => (
                                                <tr key={u._id || u.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03] group">
                                                    <Td className="font-bold text-slate-900 dark:text-white">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                                {u.name ? u.name.charAt(0).toUpperCase() : '?'}
                                                            </div>
                                                            {u.name || 'Unknown'}
                                                        </div>
                                                    </Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold">{u.email || 'No email'}</Td>
                                                    <Td>
                                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${u.role === 'admin' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'}`}>{u.role || 'user'}</span>
                                                    </Td>
                                                    <Td className="text-slate-500 dark:text-slate-400 font-bold text-xs">{u.createdAt ? format(new Date(u.createdAt), 'MMM dd, yyyy') : '-'}</Td>
                                                    <Td right>
                                                        {u.role !== 'admin' && (
                                                            <div className="flex justify-end">
                                                                <IconBtn icon={FaTrash} tone="red" title="Delete" onClick={() => handleDeleteUser(u._id || u.id)} />
                                                            </div>
                                                        )}
                                                    </Td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </TableWrap>
                                    {users.length === 0 && <EmptyState icon={FaUser} text="No users yet." />}
                                </Panel>
                            </div>
                        )}

                        {/* ============ AUDIT LOG (formerly "Principals") ============ */}
                        {activeTab === 'audit' && (
                            <div className="space-y-5 animate-in fade-in duration-300">
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2"><FaShieldAlt className="text-slate-400" size={20} /> Audit Log</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-0.5">Accounts that were removed from the active registry, and permanent deletion.</p>
                                </div>
                                <Panel noPad>
                                    <TableWrap>
                                        <thead>
                                            <tr>
                                                <Th>Name</Th><Th>Signed up</Th><Th>Removed</Th><Th>Status</Th><Th right>Actions</Th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {deletedUsers.map(du => (
                                                <tr key={du._id} className="hover:bg-slate-50 dark:hover:bg-white/[0.03]">
                                                    <Td>
                                                        <div className="font-bold text-slate-900 dark:text-white">{du.name}</div>
                                                        <div className="text-xs text-slate-400 font-semibold">{du.email}</div>
                                                    </Td>
                                                    <Td className="text-xs font-bold text-slate-500 dark:text-slate-400">{du.createdAt ? format(new Date(du.createdAt), 'MMM dd, yyyy') : '-'}</Td>
                                                    <Td className="text-xs font-bold text-red-500">{du.deletedAt ? format(new Date(du.deletedAt), 'MMM dd, yyyy') : '-'}</Td>
                                                    <Td><span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 uppercase tracking-wide">Removed</span></Td>
                                                    <Td right>
                                                        <div className="flex justify-end">
                                                            <IconBtn icon={FaTrash} tone="red" title="Permanently delete" onClick={() => handlePermanentlyDeleteUser(du._id)} />
                                                        </div>
                                                    </Td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </TableWrap>
                                    {deletedUsers.length === 0 && <EmptyState icon={FaHistory} text="No removed accounts." />}
                                </Panel>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ---------------- COMMAND PALETTE ---------------- */}
            {cmdOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/55 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4" onClick={() => setCmdOpen(false)}>
                    <div className="w-full max-w-xl bg-white dark:bg-[#111A2E] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 px-4 border-b border-slate-100 dark:border-slate-800">
                            <FaSearch size={14} className="text-slate-400" />
                            <input
                                autoFocus
                                value={cmdQuery}
                                onChange={e => setCmdQuery(e.target.value)}
                                placeholder="Type a command or search courses/users..."
                                className="flex-1 py-4 bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                            <button onClick={() => setCmdOpen(false)} className="text-slate-400 hover:text-slate-600"><FaTimes size={14} /></button>
                        </div>
                        <div className="p-2 max-h-80 overflow-y-auto">
                            {cmdActions.length === 0 && <div className="text-center py-8 text-sm text-slate-400 font-semibold">No matches.</div>}
                            {cmdActions.map((a, idx) => {
                                const Icon = a.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => { a.run(); setCmdOpen(false); setCmdQuery(''); }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                                    >
                                        <Icon size={13} className="text-slate-400 flex-shrink-0" />
                                        <span className="truncate">{a.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// =================== shared sub-components ===================

const CARD_GRADIENTS = [
    'linear-gradient(135deg,#2563EB,#3B82F6)',
    'linear-gradient(135deg,#7C3AED,#A78BFA)',
    'linear-gradient(135deg,#059669,#34D399)',
    'linear-gradient(135deg,#D97706,#FBBF24)',
    'linear-gradient(135deg,#DB2777,#F472B6)',
    'linear-gradient(135deg,#0EA5E9,#67E8F9)',
];

const TONE_CLASSES = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-400',
    violet: 'bg-gradient-to-br from-violet-500 to-violet-400',
    emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-400',
    amber: 'bg-gradient-to-br from-amber-500 to-amber-400',
};

const InsightBanner = ({ title, body }) => (
    <div className="flex items-start gap-4 rounded-2xl p-5 border border-blue-200/60 dark:border-blue-500/20 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-500/[0.06] dark:to-violet-500/[0.06]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white flex-shrink-0">
            <FaBolt size={15} />
        </div>
        <div className="min-w-0">
            <div className="text-[13px] font-black text-slate-900 dark:text-white mb-0.5">{title}</div>
            <div className="text-[12.5px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">{body}</div>
        </div>
    </div>
);

const Sparkline = ({ points }) => {
    if (!points || points.length === 0) return null;
    const values = points.map(p => p.count || 0);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    const w = 100, h = 28;
    const step = values.length > 1 ? w / (values.length - 1) : w;
    const coords = values.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
    return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-7 mt-2.5">
            <polyline points={coords} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const StatCard = ({ icon: Icon, tone, label, value, delta, deltaTone = 'up', spark }) => (
    <div className="relative bg-white dark:bg-[#111A2E] border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all">
        <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${TONE_CLASSES[tone]}`}>
                <Icon size={15} />
            </div>
            {delta && (
                <span className={`text-[10.5px] font-black px-2 py-0.5 rounded-full ${deltaTone === 'down' ? 'text-red-600 bg-red-50 dark:bg-red-500/10' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10'}`}>
                    {delta}
                </span>
            )}
        </div>
        <div className="text-[10.5px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">{label}</div>
        <div className="text-[26px] font-black text-slate-900 dark:text-white tracking-tight mt-0.5">{value}</div>
        {spark && <div className={`${tone === 'blue' ? 'text-blue-500' : tone === 'violet' ? 'text-violet-500' : tone === 'emerald' ? 'text-emerald-500' : 'text-amber-500'}`}><Sparkline points={spark} /></div>}
    </div>
);

const Panel = ({ title, icon: Icon, children, noPad, right }) => (
    <div className={`bg-white dark:bg-[#111A2E] border border-slate-200/70 dark:border-slate-800 rounded-2xl shadow-sm ${noPad ? 'overflow-hidden' : 'p-6'}`}>
        {title && (
            <div className={`flex items-center justify-between ${noPad ? 'p-5 pb-0' : 'mb-5'}`}>
                <div className="flex items-center gap-2.5 text-[15px] font-black text-slate-900 dark:text-white">
                    {Icon && <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Icon size={13} /></div>}
                    {title}
                </div>
                {right}
            </div>
        )}
        {children}
    </div>
);

const ActivityFeedPanel = ({ events }) => {
    const dotTone = { payment: 'bg-amber-500 shadow-amber-500/20', quiz: 'bg-blue-500 shadow-blue-500/20', completion: 'bg-emerald-500 shadow-emerald-500/20' };
    return (
        <Panel
            title="Live Activity"
            icon={FaBolt}
            right={<span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live</span>}
        >
            <div className="space-y-0 max-h-72 overflow-y-auto no-scrollbar">
                {events.length === 0 && <EmptyRow text="No activity recorded yet." />}
                {events.map((e, idx) => (
                    <div key={idx} className="flex gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-none">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_0_4px] ${dotTone[e.type] || 'bg-slate-400'}`} />
                        <div className="min-w-0">
                            <div className="text-[12.5px] font-bold text-slate-700 dark:text-slate-200 leading-snug">
                                {e.text}{e.meta ? <span className="text-slate-400"> · {e.meta}</span> : null}
                            </div>
                            <div className="text-[10.5px] text-slate-400 font-bold mt-0.5">{e.date ? format(new Date(e.date), 'MMM d, h:mm a') : ''}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
};

const SystemPulsePanel = () => (
    <Panel title="System Pulse" icon={FaClock}>
        <div className="space-y-0">
            {[
                { label: 'API', value: 'Operational', live: true },
                { label: 'Database', value: 'Connected', live: true },
                { label: 'Version', value: 'v1.4.0', live: false },
            ].map((r, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 text-[12.5px] font-bold border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                    {r.live ? (
                        <span className="flex items-center gap-1.5 text-emerald-500 font-black uppercase text-[10.5px] tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{r.value}
                        </span>
                    ) : <span className="text-slate-900 dark:text-white font-mono text-xs">{r.value}</span>}
                </div>
            ))}
        </div>
    </Panel>
);

const RevenueAreaChart = ({ daily, tall }) => {
    const points = daily && daily.length > 0 ? daily : [];
    const w = 600, h = tall ? 260 : 200;
    let pathLine = '', pathArea = '';
    if (points.length > 0) {
        const max = Math.max(...points.map(p => p.revenue), 1);
        const step = points.length > 1 ? w / (points.length - 1) : w;
        const coords = points.map((p, i) => [i * step, h - (p.revenue / max) * (h - 20) - 10]);
        pathLine = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ');
        pathArea = `${pathLine} L${coords[coords.length - 1][0]},${h} L0,${h} Z`;
    }
    return (
        <Panel title="Revenue Trajectory" icon={FaChartLine} right={<span className="text-[11px] font-bold text-slate-400">Last 30 days</span>}>
            {points.length > 0 ? (
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`w-full ${tall ? 'h-64' : 'h-48'}`}>
                    <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={pathArea} fill="url(#revFill)" />
                    <path d={pathLine} fill="none" stroke="#2563EB" strokeWidth="2.5" />
                </svg>
            ) : (
                <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                    <p className="text-slate-400 text-sm font-bold">No transactions in this window yet.</p>
                </div>
            )}
        </Panel>
    );
};

const RevenueCalendar = ({ monthlyRevenue }) => {
    const defaultYear = new Date().getFullYear();
    const availableYears = monthlyRevenue && monthlyRevenue.length > 0
        ? [...new Set(monthlyRevenue.map(m => m.year))].sort((a, b) => b - a)
        : [defaultYear];
    const [selectedYear, setSelectedYear] = useState(availableYears[0] || defaultYear);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearData = (monthlyRevenue || []).filter(item => item.year === selectedYear);
    const yearTotal = yearData.reduce((sum, item) => sum + item.revenue, 0);

    let displayRevenue = 0, displayTitle = '';
    if (selectedMonth === null) {
        displayRevenue = yearTotal;
        displayTitle = `${selectedYear} Total Revenue`;
    } else {
        const monthData = yearData.find(m => m.month === selectedMonth + 1);
        displayRevenue = monthData ? monthData.revenue : 0;
        displayTitle = `${months[selectedMonth]} ${selectedYear} Revenue`;
    }

    return (
        <Panel
            title="Revenue Calendar"
            icon={FaCalendarAlt}
            right={
                <div className="text-right">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{displayTitle}</div>
                    <div className="text-xl font-black text-blue-600">${displayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
            }
        >
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
                {availableYears.map(year => (
                    <button key={year} onClick={() => { setSelectedYear(year); setSelectedMonth(null); }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${selectedYear === year ? 'bg-blue-600 text-white border-blue-500' : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                        {year}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
                {months.map((month, idx) => {
                    const hasRevenue = yearData.find(m => m.month === idx + 1);
                    return (
                        <button key={month} onClick={() => setSelectedMonth(idx)}
                            className={`relative py-2.5 rounded-lg text-xs font-bold border overflow-hidden ${selectedMonth === idx ? 'bg-blue-600 text-white border-blue-500' : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                            {month}
                            {hasRevenue && selectedMonth !== idx && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </button>
                    );
                })}
            </div>
        </Panel>
    );
};

const CourseCard = ({ course, gradient, onPreview, onEnrollments, onEdit, onDelete }) => (
    <div className="group bg-white dark:bg-[#111A2E] border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
        <div className="h-20 flex items-end p-3.5" style={{ background: gradient }}>
            <span className="text-[9.5px] font-black uppercase tracking-wider text-white bg-white/20 px-2.5 py-1 rounded-full">{course.category || 'General'}</span>
        </div>
        <div className="p-4">
            <div className="text-[13.5px] font-black text-slate-900 dark:text-white leading-snug mb-2.5 line-clamp-2">{course.title || 'Untitled'}</div>
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1"><FaUser size={9} className="text-blue-400" /> {course.enrollmentCount || 0} enrolled</span>
                <StatusPill published={course.isPublished} />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 px-4 pb-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
            <IconBtn icon={FaEye} tone="blue" title="Preview" onClick={onPreview} block />
            <IconBtn icon={FaEdit} tone="blue" title="Edit" onClick={onEdit} block />
            <IconBtn icon={FaUsers} tone="emerald" title="Enrollments" onClick={onEnrollments} block />
            <IconBtn icon={FaTrash} tone="red" title="Delete" onClick={onDelete} block />
        </div>
    </div>
);

const StatusPill = ({ published }) => (
    <span className={`text-[9.5px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${published ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
        {published ? 'Published' : 'Draft'}
    </span>
);

const IconBtn = ({ icon: Icon, tone, title, onClick, block }) => {
    const toneClass = {
        blue: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 border-blue-100 dark:border-blue-500/20',
        emerald: 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
        red: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border-red-100 dark:border-red-500/20',
    }[tone];
    return (
        <button onClick={onClick} title={title} className={`${block ? 'w-full' : ''} p-2 rounded-lg border bg-white dark:bg-white/5 ${toneClass} transition-colors flex items-center justify-center`}>
            <Icon size={13} />
        </button>
    );
};

const TableWrap = ({ children }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">{children}</table>
    </div>
);

const Th = ({ children, right }) => (
    <th className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 bg-slate-50/70 dark:bg-white/[0.03] ${right ? 'text-right' : ''}`}>{children}</th>
);

const Td = ({ children, className = '', right }) => (
    <td className={`px-6 py-4 text-[13px] ${right ? 'text-right' : ''} ${className}`}>{children}</td>
);

const EmptyRow = ({ text }) => (
    <p className="text-slate-400 text-sm font-semibold italic py-4">{text}</p>
);

const EmptyState = ({ icon: Icon, text }) => (
    <div className="col-span-full py-16 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
        <Icon className="mx-auto mb-4 opacity-10" size={56} />
        {text}
    </div>
);

export default AdminDashboard;
