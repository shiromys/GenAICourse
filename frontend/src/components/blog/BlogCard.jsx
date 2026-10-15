import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return '';
    }
};

// Each card links straight out to the post on Blogger — this is an external backlink, not
// an internal route, so it's a plain anchor (new tab) rather than a React Router <Link>.
const BlogCard = ({ post }) => (
    <motion.a
        href={post.postUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="blog-card glass-card group flex flex-col h-full !pb-0 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 rounded-[2rem] overflow-hidden"
    >
        <div className="relative h-56 overflow-hidden flex-shrink-0">
            <img
                src={post.imageUrl || DEFAULT_IMAGE}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="p-7 flex flex-col flex-1">
            {post.publishedDate && (
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                    {formatDate(post.publishedDate)}
                </span>
            )}

            <h3 className="text-xl font-black text-brand mb-3 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                {post.title}
            </h3>

            {post.excerpt && (
                <p className="text-gray-400 text-sm mb-6 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                </p>
            )}

            <div className="mt-auto pt-3 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                    Read the post
                    <FaArrowRight size={11} />
                </span>
            </div>
        </div>
    </motion.a>
);

export default BlogCard;
