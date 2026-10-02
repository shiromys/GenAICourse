import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import learningPathService from '../services/learningPathService.js';
import Loader from '../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaPlay, FaCircleCheck } from 'react-icons/fa6';
import SEOHelmet from '../components/common/SEOHelmet';

const LearningPathDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [path, setPath] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPath = useCallback(async () => {
        setLoading(true);
        try {
            const result = await learningPathService.getById(id);
            setPath(result.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not load this learning path');
            navigate('/learning-paths');
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        fetchPath();
    }, [fetchPath]);

    if (loading) return <Loader />;
    if (!path) return null;

    // The next course to tackle: the first one in order that isn't done yet.
    const sortedCourses = [...(path.courses || [])].sort((a, b) => a.order - b.order);
    const nextIndex = sortedCourses.findIndex((c) => !c.isCompleted);

    return (
        <div className="section pt-8 min-h-screen bg-[#FDFCFB]">
            <SEOHelmet title={path.title} noIndex={true} />
            <div className="container py-8 md:py-16 max-w-4xl">
                <button
                    onClick={() => navigate('/learning-paths')}
                    className="mb-8 p-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-brand transition-all flex items-center gap-2 group w-fit shadow-sm hover:shadow-md"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Paths</span>
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {path.category}
                    </span>
                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {path.difficulty}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">{path.title}</h1>
                <p className="text-slate-500 font-medium mb-8 max-w-2xl">{path.description}</p>

                {path.recommendationReasons?.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        {path.recommendationReasons.map((reason, i) => (
                            <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                                {reason}
                            </span>
                        ))}
                    </div>
                )}

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8 mb-10">
                    <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Overall Progress</span>
                        <span className="font-black text-blue-600">{Math.round(path.progress || 0)}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-700"
                            style={{ width: `${path.progress || 0}%` }}
                        />
                    </div>
                </div>

                <h2 className="text-xl font-black text-slate-900 mb-6">Course Order</h2>
                <div className="space-y-4">
                    {sortedCourses.map((entry, idx) => {
                        const course = entry.courseId;
                        const isNext = idx === nextIndex;
                        return (
                            <div
                                key={entry._id || course?._id || idx}
                                className={`flex items-center gap-5 p-5 rounded-2xl border bg-white shadow-sm ${isNext ? 'border-blue-200 ring-2 ring-blue-500/10' : 'border-slate-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${entry.isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                    {entry.isCompleted ? <FaCircleCheck /> : idx + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900">{course?.title || 'Course'}</h3>
                                        {isNext && !entry.isCompleted && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                                Up Next
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                                        {course?.level} {entry.recommendedHours ? `· ~${Math.round(entry.recommendedHours)} hrs` : ''}
                                    </p>
                                </div>
                                {course?._id && (
                                    <Link
                                        to={`/courses/${course._id}`}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex-shrink-0 bg-slate-900 text-white hover:bg-blue-600 active:scale-95"
                                    >
                                        <FaPlay size={11} />
                                        {entry.isCompleted ? 'Review' : 'View Course'}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LearningPathDetail;
