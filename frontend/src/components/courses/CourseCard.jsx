import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaChevronRight, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext.jsx';

const CourseCard = ({ course }) => {
    const { checkCourseAccess, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const courseId = course._id || course.id;
    const hasAccess = checkCourseAccess(courseId);
    const price = course.isFree ? 'FREE' : `$${course.price || 29}`;

    const handleActionClick = (e) => {
        if (!hasAccess) {
            e.preventDefault();
            // Route to checkout
            if (!isAuthenticated) {
                navigate(`/register?redirect=checkout/${courseId}&type=single`);
            } else {
                navigate(`/checkout/${courseId}?type=single`);
            }
        }
        // If has access, Link handles the navigation to /courses/:id
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="course-card glass-card group flex flex-col h-full !pb-0 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 rounded-[2rem] overflow-hidden"
        >
            {/* Thumbnail */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Level & Category badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-700 border border-white/60 shadow">
                        {course.level || 'Beginner'}
                    </span>
                    {course.category && (
                        <span className="px-3 py-1 bg-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow">
                            {course.category}
                        </span>
                    )}
                </div>

                {/* Price / Access badge */}
                <div className="absolute top-4 right-4">
                    {hasAccess ? (
                        <span className="px-3 py-1.5 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                            ✓ Enrolled
                        </span>
                    ) : (
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur text-slate-900 rounded-xl text-[11px] font-black shadow border border-white/60">
                            {price}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-black text-brand mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-red-600 transition-colors">
                    {course.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                    {course.description}
                </p>

                <div className="mt-auto space-y-4">
                    {/* Meta row */}
                    <div className="flex items-center gap-5 py-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                            <FaBookOpen className="text-red-400" size={12} />
                            <span>{course.totalLessons || 0} Lessons</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    {hasAccess ? (
                        // Enrolled: go directly to the course reader
                        <Link
                            to={`/courses/${courseId}`}
                            className="btn-premium btn-primary w-full group/btn !py-3 mb-2 flex items-center justify-center gap-2"
                        >
                            CONTINUE COURSE
                            <FaChevronRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        // Not enrolled: go to checkout
                        <button
                            onClick={handleActionClick}
                            className="btn-premium btn-primary w-full group/btn !py-3 mb-2 flex items-center justify-center gap-2"
                        >
                            {course.isFree ? (
                                'ENROLL FREE'
                            ) : (
                                <>
                                    <FaLock size={11} className="opacity-70" />
                                    BUY NOW — {price}
                                </>
                            )}
                            <FaChevronRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
