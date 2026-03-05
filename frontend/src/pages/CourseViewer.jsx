import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import courseService from '../services/courseService.js';
import certificateService from '../services/certificateService.js';
import Loader from '../components/common/Loader.jsx';
import { FaChevronLeft, FaChevronRight, FaCheck, FaBars, FaTimes, FaClipboardCheck, FaPlayCircle, FaClock, FaSignal, FaBookOpen, FaMedal, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AssessmentCenter from '../components/assessment/AssessmentCenter.jsx';

const CourseViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState(new Set());
    const [showAssessment, setShowAssessment] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [existingCertificate, setExistingCertificate] = useState(null);
    const [downloadingCert, setDownloadingCert] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    const isPreview = queryParams.get('preview') === 'true';

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                if (isPreview) {
                    const courseData = await courseService.getCourse(id);
                    setCourse(courseData.data);
                } else {
                    const [courseData, progressData] = await Promise.all([
                        courseService.getCourse(id),
                        courseService.getCourseProgress(id).catch(() => null)
                    ]);
                    setCourse(courseData.data);

                    if (progressData?.data) {
                        const completed = new Set();
                        progressData.data.completedLessons?.forEach(lesson => {
                            completed.add(String(lesson.lessonId));
                        });
                        setCompletedLessons(completed);
                    }

                    // Check if this student already has a certificate for this course
                    try {
                        const certsData = await certificateService.getUserCertificates();
                        const certs = certsData?.data?.certificates || [];
                        const match = certs.find(c =>
                            c.courseId?._id?.toString() === id ||
                            c.courseId?.toString() === id
                        );
                        if (match) setExistingCertificate(match);
                    } catch (e) {
                        // Not critical — ignore
                    }
                }
            } catch (error) {
                toast.error("Failed to load course");
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [id, isPreview]);

    if (loading) return <Loader />;
    if (!course) return <div className="text-center mt-20 text-brand">Course not found</div>;

    const currentModule = course.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];
    const isLastLesson = currentModuleIndex === course.modules.length - 1 &&
        currentLessonIndex === currentModule.lessons.length - 1;

    const markCurrentLessonComplete = async () => {
        if (isPreview) return;
        try {
            const lessonId = currentLesson._id || currentLesson.id;
            const moduleId = currentModule._id || currentModule.id;
            await courseService.markLessonComplete(id, moduleId, lessonId);

            setCompletedLessons(prev => new Set([...prev, String(lessonId)]));
        } catch (error) {
            console.error('Failed to mark lesson complete:', error);
        }
    };

    const handleNext = async () => {
        const lessonId = currentLesson._id || currentLesson.id;
        if (!isPreview && !completedLessons.has(String(lessonId))) {
            await markCurrentLessonComplete();
        }

        if (currentLessonIndex < currentModule.lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        } else if (currentModuleIndex < course.modules.length - 1) {
            setCurrentModuleIndex(prev => prev + 1);
            setCurrentLessonIndex(0);
        } else {
            if (isPreview) {
                toast.success("End of course preview.");
                return;
            }
            const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
            const updatedCompleted = new Set([...completedLessons, String(lessonId)]);

            if (updatedCompleted.size >= totalLessons) {
                if (course.quizId) {
                    toast.success("Congratulations! Course completed. Redirecting to assessment...");
                    navigate(`/courses/${id}/assessment`);
                } else {
                    toast.success("Course Completed!");
                    navigate('/dashboard');
                }
            } else {
                if (course.quizId && window.confirm("You haven't completed all lessons. Take the assessment anyway?")) {
                    navigate(`/courses/${id}/assessment`);
                }
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(prev => prev - 1);
        } else if (currentModuleIndex > 0) {
            setCurrentModuleIndex(prev => prev - 1);
            setCurrentLessonIndex(course.modules[currentModuleIndex - 1].lessons.length - 1);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDownloadCertificate = async () => {
        if (!existingCertificate) return;
        try {
            setDownloadingCert(true);
            const certId = existingCertificate._id || existingCertificate.id;
            await certificateService.downloadCertificate(certId);
            toast.success('Certificate downloaded!');
        } catch (err) {
            toast.error(err.message || 'Download failed. Please try again.');
        } finally {
            setDownloadingCert(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[var(--text-main)] font-sans pt-24 lg:pt-32 pb-20 selection:bg-red-50 selection:text-red-600">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT COLUMN: Sidebar Navigation */}
                    <div className="w-full lg:w-96 flex-shrink-0 lg:sticky lg:top-32 h-fit">
                        <div className="bg-[#0F172A] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[calc(100vh-160px)]">
                            <div className="p-8 border-b border-slate-800 bg-slate-900/50">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                    <FaBookOpen className="text-red-500" />
                                    Course Content
                                </h3>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-8">
                                {course.modules.map((mod, mIdx) => (
                                    <div key={mod._id} className="bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800/50">
                                        <div className="px-5 py-4 bg-slate-800/80 border-b border-slate-800/30">
                                            <h4 className="font-bold text-white text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                <span className="text-red-500">M{mIdx + 1}</span>
                                                <span className="truncate">{mod.title}</span>
                                            </h4>
                                        </div>
                                        <div className="divide-y divide-slate-800/20">
                                            {mod.lessons.map((less, lIdx) => {
                                                const lessonId = less._id || less.id;
                                                const isCompleted = completedLessons.has(String(lessonId));
                                                const isCurrent = mIdx === currentModuleIndex && lIdx === currentLessonIndex;

                                                return (
                                                    <button
                                                        key={lessonId}
                                                        onClick={() => {
                                                            setShowAssessment(false);
                                                            setCurrentModuleIndex(mIdx);
                                                            setCurrentLessonIndex(lIdx);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className={`w-full text-left p-4 flex items-center justify-between group transition-all duration-300 ${isCurrent ? 'bg-red-600 shadow-lg shadow-red-900/20' : 'hover:bg-slate-800/60'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4 overflow-hidden">
                                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isCurrent ? 'bg-white/20 text-white' : isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-500'
                                                                }`}>
                                                                {isCompleted ? <FaCheck size={10} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className={`text-sm font-bold truncate transition-colors ${isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                                                    }`}>{less.title}</p>
                                                                <p className={`text-[10px] font-black uppercase tracking-tighter ${isCurrent ? 'text-white/60' : 'text-slate-500'
                                                                    }`}>{less.duration || 5} MINS</p>
                                                            </div>
                                                        </div>
                                                        <FaPlayCircle size={14} className={isCurrent ? 'text-white/40' : 'opacity-0 group-hover:opacity-100 text-red-500'} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {course.quizId && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => { setShowAssessment(true); setShowCertificate(false); }}
                                            className={`w-full flex items-center justify-center gap-3 p-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all duration-500 ${showAssessment
                                                ? 'bg-red-600 text-white shadow-xl shadow-red-900/40'
                                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-900/20'
                                                }`}
                                        >
                                            <FaClipboardCheck /> Final Assessment
                                        </button>
                                    </div>
                                )}

                                {/* Certificate button if student already certified this course */}
                                {existingCertificate && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => { setShowCertificate(true); setShowAssessment(false); }}
                                            className={`w-full flex items-center justify-center gap-3 p-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all duration-500 ${showCertificate
                                                ? 'bg-yellow-500 text-white shadow-xl shadow-yellow-900/40'
                                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20'
                                                }`}
                                        >
                                            <FaMedal /> My Certificate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content Viewer */}
                    <div className="flex-1 space-y-8">
                        {/* Header Area */}
                        <div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <div className="flex-1">
                                    <nav className="flex items-center gap-4 mb-4 text-[10px] font-black text-red-600 uppercase tracking-widest">
                                        <Link to="/dashboard" className="hover:text-red-700 transition-colors">Academy</Link>
                                        <span className="text-slate-300">/</span>
                                        <span className="text-slate-400">Knowledge Phase</span>
                                    </nav>
                                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
                                        {course.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><FaClock className="text-red-500" /> {course.totalDuration || 60} MINS</span>
                                        <span className="flex items-center gap-2"><FaSignal className="text-red-500" /> {course.level || 'Expert'}</span>
                                        <span className="flex items-center gap-2"><FaBookOpen className="text-red-500" /> {course.modules.length} MODULES</span>
                                    </div>
                                </div>
                                {!isPreview && (
                                    <div className="bg-white px-8 py-5 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/50 flex items-center gap-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-black text-slate-900 leading-none mb-1">{completedLessons.size}</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">DONE</div>
                                        </div>
                                        <div className="h-10 w-px bg-gray-100"></div>
                                        <div className="relative w-14 h-14">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={150.796} strokeDashoffset={150.796 - (150.796 * (completedLessons.size / (course.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 1)))} className="text-red-600 transition-all duration-1000" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-900">
                                                {Math.round((completedLessons.size / (course.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 1)) * 100)}%
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Container */}
                        <div id="lesson-content" className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[600px]">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={showCertificate ? 'certificate' : showAssessment ? 'assessment' : currentLesson?._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-8 lg:p-16"
                                >
                                    {showCertificate && existingCertificate ? (
                                        <div className="text-center py-12">
                                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-yellow-50 border-2 border-yellow-200 mb-8">
                                                <FaMedal className="text-yellow-500 text-4xl" />
                                            </div>
                                            <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Course Certified</h2>
                                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-12">You have already earned this certificate</p>

                                            {/* Certificate Preview Card */}
                                            <div className="max-w-lg mx-auto bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-10 shadow-xl text-left">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
                                                        <FaMedal className="text-white" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-700">Certificate of Achievement</span>
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 mb-1">{existingCertificate.userName || 'Student'}</h3>
                                                <p className="text-slate-500 text-sm font-medium mb-6">has successfully completed</p>
                                                <h4 className="text-xl font-black text-yellow-700 mb-6">{existingCertificate.courseTitle || course.title}</h4>
                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    <div className="bg-white rounded-2xl p-4 border border-yellow-100">
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</div>
                                                        <div className="text-2xl font-black text-slate-900">{existingCertificate.score ?? 'N/A'}%</div>
                                                    </div>
                                                    <div className="bg-white rounded-2xl p-4 border border-yellow-100">
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grade</div>
                                                        <div className="text-2xl font-black text-emerald-600">{existingCertificate.grade ?? 'Pass'}</div>
                                                    </div>
                                                    <div className="col-span-2 bg-white rounded-2xl p-4 border border-yellow-100">
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completed On</div>
                                                        <div className="text-base font-black text-slate-900">
                                                            {existingCertificate.completionDate
                                                                ? new Date(existingCertificate.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                                                : 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleDownloadCertificate}
                                                    disabled={downloadingCert}
                                                    className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 disabled:opacity-60"
                                                >
                                                    <FaDownload />
                                                    {downloadingCert ? 'Downloading...' : 'Download Certificate PDF'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : !showAssessment ? (
                                        <>
                                            <div className="flex items-center gap-4 mb-10">
                                                <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                                                    Module {currentModuleIndex + 1}
                                                </span>
                                                <span className="text-slate-300">/</span>
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                                    {currentModule.title}
                                                </span>
                                            </div>

                                            <h2 className="text-3xl lg:text-5xl font-black mb-8 text-slate-900 tracking-tight">
                                                {currentLesson.title}
                                            </h2>

                                            {/* Key Takeaways */}
                                            {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                                    <div className="md:col-span-1 border-l-4 border-red-600 pl-6 text-left">
                                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Deep Insights</h3>
                                                        <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase">The technical architecture and strategic implementation nodes for this session.</p>
                                                    </div>
                                                    <div className="md:col-span-2 bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100">
                                                        <ul className="space-y-4">
                                                            {currentLesson.keyPoints.map((point, idx) => (
                                                                <li key={idx} className="flex items-start gap-3 group">
                                                                    <FaCheck className="text-red-500 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                                    <span className="text-sm font-bold text-slate-700 leading-relaxed">{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="prose prose-slate prose-lg max-w-none">
                                                <div className="text-lg font-medium text-slate-600 leading-loose space-y-6">
                                                    {currentLesson.content.split('\n').map((p, i) => (
                                                        <p key={i}>{p}</p>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Navigation Section */}
                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-20 pt-12 border-t border-gray-100">
                                                <button
                                                    onClick={handlePrev}
                                                    disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                                                    className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white border border-gray-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-95"
                                                >
                                                    Roll Back
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-red-600 text-white font-black text-sm uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-900/10 transition-all active:scale-95"
                                                >
                                                    {isLastLesson ? 'Authorize Completion' : 'Proceed to Next Node'}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <AssessmentCenter isEmbedded={true} courseId={id} />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;
