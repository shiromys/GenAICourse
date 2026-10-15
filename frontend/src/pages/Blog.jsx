import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import blogService from '../services/blogService.js';
import BlogCard from '../components/blog/BlogCard.jsx';
import SEOHelmet from '../components/common/SEOHelmet';
import { FaNewspaper } from 'react-icons/fa';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await blogService.getBlogPosts();
                setPosts(data.data || []);
            } catch (error) {
                console.error('Failed to load blog posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="section pt-8 min-h-screen bg-[var(--bg-main)]">
            <SEOHelmet
                title="Blog | Generative AI Tips, Guides & Updates"
                description="Guides, tips, and updates on generative AI and building practical AI skills — from the GenAI Course team."
                canonical="/blog"
                breadcrumb={[
                    { name: 'Home', url: '/' },
                    { name: 'Blog', url: '/blog' },
                ]}
            />

            <div className="container overflow-visible">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-center text-brand">
                        The <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Blog</span>
                    </h1>
                    <h2 className="text-gray-500 font-bold tracking-widest uppercase text-xs text-center">
                        Guides and updates on generative AI
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-accent rounded-full animate-spin"></div>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post, idx) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 glass-card border-dashed border-gray-300 bg-gray-50 rounded-2xl">
                        <FaNewspaper className="mx-auto mb-4 text-gray-300" size={40} />
                        <h3 className="text-3xl font-black text-brand mb-2 uppercase tracking-widest">No Posts Yet</h3>
                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Check back soon for new articles</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
