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
                        if (match) {
                            setExistingCertificate(match);
                            setShowCertificate(true);
                        }
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
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-600">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* LEFT SIDEBAR: Redesigned for Screenshot matching */}
                <div className={`w-full lg:w-80 flex-shrink-0 border-r border-slate-100 bg-white lg:sticky lg:top-0 h-screen overflow-y-auto no-scrollbar transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="p-6 border-b border-slate-50">
                        <Link to={`/courses/${id}`} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors mb-8 group">
                            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Course
                        </Link>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Course Content</h2>
                    </div>

                    <div className="p-4 space-y-8">
                        {existingCertificate ? (
                            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl mb-6">
                                <h3 className="font-bold mb-2">🎓 Course Certified</h3>
                                <p className="text-sm">You have successfully completed this course and earned your certificate.</p>
                            </div>
                        ) : (
                            course.modules.map((mod, mIdx) => (
                                <div key={mod._id} className="space-y-4">
                                    <div className="px-2">
                                        <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-orange-600 mb-1">
                                            {mod.category || 'Course Module'}
                                        </h4>
                                        <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                                            {mod.title}
                                        </h5>
                                    </div>

                                    <div className="space-y-1">
                                        {mod.lessons.map((less, lIdx) => {
                                            const lessonId = less._id || less.id;
                                            const isCompleted = completedLessons.has(String(lessonId));
                                            const isCurrent = !showAssessment && !showCertificate && mIdx === currentModuleIndex && lIdx === currentLessonIndex;

                                            return (
                                                <button
                                                    key={lessonId}
                                                    onClick={() => {
                                                        setShowAssessment(false);
                                                        setShowCertificate(false);
                                                        setCurrentModuleIndex(mIdx);
                                                        setCurrentLessonIndex(lIdx);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group transition-all duration-200 ${isCurrent ? 'bg-orange-50/80' : 'hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center ${isCompleted ? 'text-emerald-500' : isCurrent ? 'text-orange-600' : 'text-slate-300'
                                                            }`}>
                                                            {isCompleted ? <FaCheck size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                        </div>
                                                        <p className={`text-xs font-bold truncate leading-tight ${isCurrent ? 'text-orange-700' : 'text-slate-600 group-hover:text-slate-900'
                                                            }`}>{less.title}</p>
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-400">
                                                        {lIdx + 1}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Special Buttons */}
                        <div className="pt-4 space-y-3">
                            {!existingCertificate && course.quizId && (
                                <button
                                    onClick={() => { setShowAssessment(true); setShowCertificate(false); }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${showAssessment
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white border border-slate-100 text-slate-600 hover:border-orange-200 hover:text-orange-600'
                                        }`}
                                >
                                    <span>Final Assessment</span>
                                    <FaClipboardCheck size={14} />
                                </button>
                            )}

                            {existingCertificate && (
                                <button
                                    onClick={() => { setShowCertificate(true); setShowAssessment(false); }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${showCertificate
                                        ? 'bg-orange-600 text-white shadow-lg'
                                        : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                                        }`}
                                >
                                    <span>My Certificate</span>
                                    <FaMedal size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-4xl mx-auto px-8 lg:px-16 py-12 lg:py-20">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={showCertificate ? 'certificate' : showAssessment ? 'assessment' : currentLesson?._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {showCertificate && existingCertificate ? (
                                    <div className="text-center py-12">
                                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-orange-50 text-orange-600 mb-8 border border-orange-100">
                                            <FaMedal size={40} />
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Credential Issued</h2>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-12">Global AI Certification</p>

                                        <div className="max-w-lg mx-auto bg-white border border-slate-100 rounded-3xl p-10 shadow-2xl shadow-slate-200/50 text-left">
                                            <h3 className="text-2xl font-black text-slate-900 mb-1">{existingCertificate.userName}</h3>
                                            <p className="text-slate-500 text-sm font-medium mb-8">Completed: {existingCertificate.courseTitle || course.title}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-8">
                                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</div>
                                                    <div className="text-2xl font-black text-slate-900">{existingCertificate.score}%</div>
                                                </div>
                                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grade</div>
                                                    <div className="text-2xl font-black text-orange-600">{existingCertificate.grade}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleDownloadCertificate}
                                                disabled={downloadingCert}
                                                className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-60"
                                            >
                                                <FaDownload />
                                                {downloadingCert ? 'Processing...' : 'Download Certificate PDF'}
                                            </button>
                                        </div>
                                    </div>
                                ) : !showAssessment ? (
                                    <div className="space-y-12">
                                        <div>
                                            <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-orange-600 mb-3">
                                                {currentModule.title}
                                            </h4>
                                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-4">
                                                {currentLesson.title}
                                            </h1>
                                            <div className="text-3xl font-bold text-slate-200">0</div>
                                        </div>

                                        {/* Styled Key Points Box */}
                                        {currentLesson.keyPoints && currentLesson.keyPoints.length > 0 && (
                                            <div className="bg-[#FBFCFD] border-2 border-slate-50 rounded-[2.5rem] p-10 relative overflow-hidden">
                                                <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-orange-600 rounded-r-full" />
                                                <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                                                    Key Points
                                                </h3>
                                                <ul className="space-y-5">
                                                    {currentLesson.keyPoints.map((point, idx) => (
                                                        <li key={idx} className="flex items-start gap-4">
                                                            <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" size={14} />
                                                            <span className="text-base font-medium text-slate-600 leading-relaxed">{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="prose prose-slate prose-lg max-w-none">
                                            <div className="text-lg font-medium text-slate-500 leading-loose space-y-6">
                                                {currentLesson.content.split('\n').map((p, i) => (
                                                    <p key={i}>{p}</p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom Navigation */}
                                        <div className="pt-20 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-slate-50">
                                            <button
                                                onClick={handlePrev}
                                                disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                                                className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
                                            >
                                                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center">
                                                    <FaChevronLeft size={10} />
                                                </div>
                                                Previous Lesson
                                            </button>

                                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                                                Lesson {currentLessonIndex + 1} of {currentModule.lessons.length}
                                            </div>

                                            <button
                                                onClick={handleNext}
                                                className="flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
                                            >
                                                {isLastLesson ? 'Finish Course' : 'Next Lesson'}
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                <FaChevronRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <AssessmentCenter isEmbedded={true} courseId={id} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;
