import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import courseService from '../services/courseService.js';
import Loader from '../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { FaPlay, FaCheckCircle, FaLock, FaList, FaArrowLeft, FaStar, FaRegStar, FaUserCircle, FaTrash } from 'react-icons/fa';
import { getSafeThumbnailUrl } from '../utils/thumbnailHelper.js';
import { Helmet } from 'react-helmet-async';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const data = await courseService.getCourse(id);
                setCourse(data.data);

                // Check enrollment by checking user's enrolledCourses array of objects
                if (isAuthenticated && user?.enrolledCourses) {
                    const enrolled = user.enrolledCourses.some(enrollment =>
                        enrollment.courseId?.toString() === id || enrollment._id?.toString() === id
                    );
                    setIsEnrolled(enrolled);
                }
            } catch (error) {
                toast.error('Failed to load course details');
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id, isAuthenticated, user, navigate]);

    // If this user already left a review, pre-fill the form so re-submitting
    // reads as "update" rather than silently overwriting their old review.
    const myReview = course?.reviews?.find(
        (r) => user?._id && (r.userId?._id || r.userId)?.toString() === user._id.toString()
    );
    useEffect(() => {
        if (myReview) {
            setReviewRating(myReview.rating);
            setReviewComment(myReview.comment || '');
        }
    }, [myReview?._id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewRating) {
            toast.warn('Please select a star rating.');
            return;
        }
        setSubmittingReview(true);
        try {
            const result = await courseService.addReview(id, reviewRating, reviewComment.trim());
            setCourse(result.data);
            toast.success(myReview ? 'Your review was updated!' : 'Thanks for your review!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    // Admin-only moderation escape hatch — catches anything the backend's
    // profanity filter doesn't (harassment, spam, etc. that isn't a "bad
    // word"). Not shown to regular users at all.
    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Remove this review? This cannot be undone.')) return;
        try {
            const result = await courseService.deleteReview(id, reviewId);
            setCourse(result.data);
            toast.success('Review removed');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove review');
        }
    };

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            // Paid courses: go straight to checkout — it supports guest checkout
            // (enter email, pay, account created automatically). Free courses
            // still require an account since there's no purchase to anchor a
            // guest record to.
            if (!course.isFree) {
                navigate(`/checkout/${id}?type=single`);
                return;
            }
            toast.info('Please login to enroll');
            navigate(`/login?redirect=${encodeURIComponent(`courses/${id}/enroll`)}`);
            return;
        }

        // Check enrollment or bundle access
        const hasAccess = user?.enrolledCourses?.some(enrollment =>
            enrollment.courseId?.toString() === id || enrollment._id?.toString() === id || enrollment.courseId?._id?.toString() === id
        ) || user?.hasAllCoursesAccess;

        if (hasAccess) {
            toast.info('You already have access to this course!');
            navigate(`/courses/${id}/learn`);
            return;
        }

        if (!course.isFree) {
            navigate(`/checkout/${id}?type=single`);
            return;
        }

        setEnrolling(true);
        try {
            await courseService.enrollCourse(id);
            setIsEnrolled(true);
            toast.success('Successfully enrolled!');
            // Update local state or redirect
            navigate(`/courses/${id}/learn`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Enrollment failed');
        } finally {
            setEnrolling(false);
        }
    };

    const startLearning = () => {
        // Enrollment or bundle access check
        const hasAccess = isEnrolled || user?.hasAllCoursesAccess;

        if (hasAccess) {
            navigate(`/courses/${id}/learn`);
        } else {
            handleEnroll();
        }
    };

    if (loading) return <Loader />;
    if (!course) return null;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title || "Unknown Course",
        "description": course.description || "A comprehensive AI course.",
        "provider": {
            "@type": "Organization",
            "name": "GenAI Course",
            "sameAs": "https://genaicourse.io"
        },
        // Real rating data only — omit the aggregateRating block entirely when
        // there are no reviews yet rather than fabricate one, per Google's
        // structured-data guidelines (and basic honesty to customers).
        ...(course.ratingCount > 0 ? {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": course.averageRating.toFixed(1),
                "reviewCount": course.ratingCount
            }
        } : {}),
        "offers": {
            "@type": "Offer",
            "price": course.isFree ? "0.00" : (course.price || "99.00"),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <div className="bg-[var(--bg-main)] min-h-screen pt-8">
            <Helmet>
                <title>{course.title ? `${course.title} | GenAI Course` : 'Course Details'}</title>
                <meta name="description" content={course.description || "Enroll in our top-rated AI course today."} />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>
            {/* Header */}
            <div className="bg-white py-16 border-b border-gray-200 shadow-sm">
                <div className="container">
                    <button
                        onClick={() => navigate('/courses')}
                        className="mb-8 p-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-brand transition-all flex items-center gap-2 group w-fit shadow-sm hover:shadow-md"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Library</span>
                    </button>
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <div className="flex-1">
                            <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold mb-4 border border-accent/20">
                                {course.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-brand" data-testid="course-title">{course?.title || 'Unknown Course'}</h1>
                            <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-3xl font-medium" data-testid="course-description">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8 font-medium">
                                <div className="flex items-center">
                                    <span className="font-bold text-brand mr-2">Level:</span> {course.level}
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold text-brand mr-2">Duration:</span> {course.totalDuration || 60} mins
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold text-brand mr-2">Lessons:</span> {course.totalLessons || 0}
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold text-brand mr-2">Enrolled:</span> {course.enrollmentCount} User
                                </div>
                                {course.ratingCount > 0 && (
                                    <div className="flex items-center gap-1.5" data-testid="course-rating-summary">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            star <= Math.round(course.averageRating)
                                                ? <FaStar key={star} className="text-amber-400" size={14} />
                                                : <FaRegStar key={star} className="text-gray-300" size={14} />
                                        ))}
                                        <span className="font-bold text-brand ml-1">{course.averageRating.toFixed(1)}</span>
                                        <span>({course.ratingCount} review{course.ratingCount === 1 ? '' : 's'})</span>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={startLearning}
                                className="btn-premium btn-primary text-lg px-8 py-3 flex items-center"
                                data-testid={isEnrolled ? "start-learning-button" : "enroll-button"}
                            >
                                <FaPlay className="mr-2" />
                                {isEnrolled || user?.hasAllCoursesAccess ? 'Continue Learning' : (course.isFree ? 'Enroll Now - Free' : 'Buy Now')}
                            </button>
                        </div>

                        <div className="w-full md:w-1/3 max-w-sm">
                            <div className="card p-2 bg-white border border-gray-200 shadow-xl rounded-2xl">
                                <img
                                    src={getSafeThumbnailUrl(course.thumbnail, 'https://placehold.co/400x250?text=Course')}
                                    alt={course?.title || 'Course'}
                                    className="w-full rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum */}
            <div className="container py-16">
                <h2 className="section-title text-left mb-10 flex items-center text-brand font-black text-3xl">
                    <FaList className="mr-3 text-accent" /> Course Curriculum
                </h2>

                <div className="max-w-4xl space-y-4">
                    {course.modules?.map((module, mIndex) => (
                        <div key={module._id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-brand">
                                    Module {mIndex + 1}: {module?.title || 'No Title'}
                                </h3>
                                <span className="text-sm text-gray-500 font-bold">{module.lessons?.length} Lessons</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {module.lessons?.map((lesson, lIndex) => {
                                    const lessonId = lesson._id || lesson.id;
                                    return (
                                        <Link
                                            key={lessonId}
                                            to={`/courses/${id}/lessons/${lessonId}`}
                                            className={`p-4 flex items-center hover:bg-gray-50 transition-colors ${!isEnrolled ? 'cursor-not-allowed opacity-60' : ''
                                                }`}
                                            onClick={(e) => {
                                                if (!isEnrolled) {
                                                    e.preventDefault();
                                                    toast.info('Please enroll to access this lesson');
                                                }
                                            }}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-xs font-bold text-gray-500 border border-gray-200">
                                                {lIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-brand font-bold text-sm">{lesson?.title || 'Untitled Lesson'}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5 font-medium">{lesson?.duration || 5} mins</p>
                                            </div>
                                            <div className={`${isEnrolled ? 'text-accent' : 'text-gray-300'}`}>
                                                {isEnrolled ? (
                                                    <FaPlay size={14} className="opacity-70" />
                                                ) : (
                                                    <FaLock size={14} />
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {course.quizId && (
                        <div className="border border-green-200 rounded-xl overflow-hidden bg-green-50/30">
                            <div className="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-green-800">
                                    Final Assessment
                                </h3>
                                <span className="text-sm text-green-700 font-bold">1 Assessment</span>
                            </div>
                            <div className="p-4">
                                <Link
                                    to={`/courses/${id}/assessment`}
                                    className={`flex items-center hover:bg-green-50 transition-colors rounded p-2 ${!isEnrolled ? 'cursor-not-allowed opacity-60' : ''}`}
                                    onClick={(e) => {
                                        if (!isEnrolled) {
                                            e.preventDefault();
                                            toast.info('Please enroll to access success assessment');
                                        }
                                    }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4 text-green-600 border border-green-200">
                                        <FaCheckCircle size={14} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-green-900 font-bold text-sm">Course Final Exam</h4>
                                        <p className="text-xs text-green-700/80 mt-0.5 font-medium">Test your knowledge to earn certificate</p>
                                    </div>
                                    <div className={`${isEnrolled ? 'text-green-600' : 'text-gray-300'}`}>
                                        {isEnrolled ? <FaPlay size={14} className="opacity-70" /> : <FaLock size={14} />}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews */}
            <div className="container py-16 border-t border-gray-100">
                <div className="max-w-4xl">
                    <h2 className="section-title text-left mb-8 flex items-center text-brand font-black text-3xl">
                        <FaStar className="mr-3 text-amber-400" /> Learner Reviews
                    </h2>

                    {isEnrolled && (
                        <form
                            onSubmit={handleReviewSubmit}
                            className="mb-10 p-6 rounded-xl border border-gray-200 bg-gray-50/50"
                        >
                            <h3 className="font-bold text-brand mb-3">
                                {myReview ? 'Update your review' : 'Leave a review'}
                            </h3>
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="text-2xl focus:outline-none"
                                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                    >
                                        {star <= (hoverRating || reviewRating)
                                            ? <FaStar className="text-amber-400" />
                                            : <FaRegStar className="text-gray-300" />}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                maxLength={1000}
                                rows={3}
                                placeholder="What did you think of this course? (optional)"
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 mb-4"
                            />
                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="btn-premium btn-primary px-6 py-2.5 disabled:opacity-60"
                            >
                                {submittingReview ? 'Submitting...' : myReview ? 'Update Review' : 'Submit Review'}
                            </button>
                        </form>
                    )}

                    {course.reviews?.length > 0 ? (
                        <div className="space-y-6">
                            {[...course.reviews]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((review) => (
                                    <div key={review._id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                        <FaUserCircle className="text-gray-300 flex-shrink-0 mt-1" size={32} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-bold text-brand text-sm">{review.userId?.name || 'Learner'}</span>
                                                <div className="flex items-center">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        star <= review.rating
                                                            ? <FaStar key={star} className="text-amber-400" size={11} />
                                                            : <FaRegStar key={star} className="text-gray-300" size={11} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                                {user?.role === 'admin' && (
                                                    <button
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        className="ml-auto text-gray-300 hover:text-red-500 transition-colors"
                                                        title="Remove this review (admin)"
                                                        aria-label="Remove review"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                )}
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-gray-600 font-medium leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 font-medium">
                            No reviews yet — be the first to share what you thought of this course.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
