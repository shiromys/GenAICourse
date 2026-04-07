import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';
import { FaUser, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminCourseEnrollments = () => {
    const { id } = useParams();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseTitle, setCourseTitle] = useState('');

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                // Get course details first for the title
                try {
                    const courseData = await adminService.getCourse(id);
                    setCourseTitle(courseData.data.title);
                } catch (err) {
                    console.error('Failed to load course details', err);
                    setCourseTitle('Course');
                }

                const data = await adminService.getCourseEnrollments(id);
                setEnrollments(data.data || []);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                toast.error('Failed to load enrollments');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen theme-beige bg-[var(--bg-main)] text-[var(--text-main)] font-sans p-6 pt-28">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8 flex items-center gap-4">
                    <Link to="/admin/dashboard" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                        <FaArrowLeft className="text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-heading">Student Enrollments</h1>
                        <p className="text-slate-500 font-medium">
                            {courseTitle} • {enrollments.length} Students
                        </p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-slate-600">
                            <thead className="bg-slate-50/80 text-slate-900 uppercase text-[10px] font-black tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Enrolled Date</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {enrollments.length > 0 ? (
                                    enrollments.map((enrollment, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-xs font-black text-amber-600 border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                                    {enrollment.userId?.name ? enrollment.userId.name.charAt(0).toUpperCase() : <FaUser />}
                                                </div>
                                                {enrollment.userId?.name || 'Unknown User'}
                                            </td>
                                            <td className="px-6 py-4 font-medium">{enrollment.userId?.email || 'No email'}</td>
                                            <td className="px-6 py-4 text-sm font-mono">
                                                {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="bg-amber-500 h-2 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                                                            style={{ width: `${enrollment.progress || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900">{enrollment.progress || 0}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {enrollment.isCompleted ? (
                                                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                                                        <FaCheckCircle /> Completed
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit">
                                                        <FaClock /> In Progress
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {enrollment.lastAccessedAt ? new Date(enrollment.lastAccessedAt).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            <FaUser className="mx-auto h-12 w-12 opacity-20 mb-3" />
                                            No students enrolled yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCourseEnrollments;
