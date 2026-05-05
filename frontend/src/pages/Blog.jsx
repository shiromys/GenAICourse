/**
 * Blog.jsx — SEO Hub Page for Long-tail Keyword Content
 *
 * Targets:
 *   - "best generative AI course for beginners 2026"
 *   - "AI course with certificate USA"
 *   - "AI course for non programmers"
 *   - "learn AI online free"
 *   - "AI certification cost"
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendar, FaClock } from 'react-icons/fa';
import SEOHelmet from '../components/common/SEOHelmet';

// ── Static blog articles (extend as you grow the blog) ───────────────────
export const BLOG_POSTS = [
    {
        slug: 'best-generative-ai-course-for-beginners-2026',
        title: 'Best Generative AI Course for Beginners in 2026',
        excerpt:
            'Looking for the best generative AI course for beginners in 2026? We break down what to look for, which skills matter most, and why hands-on AI training with certification beats passive learning.',
        category: 'Guides',
        readTime: '7 min read',
        date: '2026-01-15',
        primaryKeyword: 'best generative AI course for beginners 2026',
    },
    {
        slug: 'ai-course-for-non-programmers',
        title: 'The Best AI Course for Non-Programmers (No Code Required)',
        excerpt:
            'You don\'t need to know Python to learn AI. Discover how non-programmers are breaking into AI careers through focused generative AI courses with no-code tools, prompt engineering, and practical certification.',
        category: 'For Beginners',
        readTime: '6 min read',
        date: '2026-02-03',
        primaryKeyword: 'AI course for non programmers',
    },
    {
        slug: 'ai-course-with-certificate-usa',
        title: 'AI Course with Certificate in the USA: What You Need to Know',
        excerpt:
            'Earning an AI certification course in the USA doesn\'t require a university degree. Learn how online AI certificates are changing hiring practices, what employers look for, and how to choose the right course.',
        category: 'Certification',
        readTime: '8 min read',
        date: '2026-02-20',
        primaryKeyword: 'AI course with certificate USA',
    },
    {
        slug: 'ai-certification-cost-worth-it',
        title: 'AI Certification Cost in 2026: Is It Worth the Investment?',
        excerpt:
            'How much does an AI certification course cost, and is it worth it? We compare free resources, university programmes, and affordable platforms — and explain why affordable doesn\'t mean low quality.',
        category: 'Pricing',
        readTime: '5 min read',
        date: '2026-03-10',
        primaryKeyword: 'AI certification cost',
    },
    {
        slug: 'job-ready-ai-course-what-to-learn',
        title: 'What Makes a Job-Ready AI Course in 2026?',
        excerpt:
            'Not all AI courses lead to jobs. Discover the specific skills, tools, and projects that make an AI course truly job-ready — and why a verifiable AI certificate matters to modern hiring managers.',
        category: 'Career',
        readTime: '6 min read',
        date: '2026-03-25',
        primaryKeyword: 'job ready AI course',
    },
    {
        slug: 'learn-ai-online-complete-guide',
        title: 'How to Learn AI Online: A Complete Beginner\'s Guide (2026)',
        excerpt:
            'A step-by-step guide to learning AI online from scratch. Covers what topics to study first, how to build a portfolio, which tools matter, and how to earn a credible AI certification without a degree.',
        category: 'Guides',
        readTime: '10 min read',
        date: '2026-04-01',
        primaryKeyword: 'learn AI online',
    },
];

// ── Blog ItemList JSON-LD ─────────────────────────────────────────────────
const BLOG_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'GenAI Course Blog — AI Learning Guides & Resources',
    description:
        'Expert guides on generative AI courses, AI certifications, career outcomes, and how to learn AI online in 2026.',
    url: 'https://genaicourse.io/blog',
    publisher: {
        '@type': 'EducationalOrganization',
        name: 'GenAI Course',
        url: 'https://genaicourse.io',
    },
    blogPost: BLOG_POSTS.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `https://genaicourse.io/blog/${post.slug}`,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: 'GenAI Course',
        },
    })),
};

const CATEGORY_COLORS = {
    'Guides': 'bg-indigo-100 text-indigo-700',
    'For Beginners': 'bg-emerald-100 text-emerald-700',
    'Certification': 'bg-violet-100 text-violet-700',
    'Pricing': 'bg-amber-100 text-amber-700',
    'Career': 'bg-rose-100 text-rose-700',
};

const Blog = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] pt-28 pb-20">

            {/* ── SEO META ────────────────────────────────────────────────── */}
            <SEOHelmet
                title="AI Learning Blog | Generative AI Guides & Certification Tips 2026"
                description="Expert guides on the best generative AI courses for beginners, AI certification costs, how to learn AI online, and career tips for 2026. GenAI Course blog."
                canonical="/blog"
                schema={BLOG_SCHEMA}
                breadcrumb={[
                    { name: 'Home', url: '/' },
                    { name: 'AI Blog', url: '/blog' },
                ]}
            />

            <div className="container max-w-5xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest">
                        AI Learning Resources
                    </span>

                    {/* H1 — keyword: "generative AI course" + "learn AI online" */}
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        The GenAI Course{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                            Blog
                        </span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Expert guides to help you choose the right AI course online, understand AI
                        certification costs, and build a job-ready AI skillset in 2026.
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {BLOG_POSTS.map((post, idx) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * idx }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 overflow-hidden group"
                        >
                            {/* Card header accent */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-violet-500" />

                            <div className="p-8">
                                {/* Category + meta */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <FaClock className="text-gray-300" size={10} />
                                        {post.readTime}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                        <FaCalendar className="text-gray-300" size={10} />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                                        {post.title}
                                    </Link>
                                </h2>

                                {/* Excerpt */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* CTA */}
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm hover:text-indigo-700 transition-colors group/link"
                                    aria-label={`Read: ${post.title}`}
                                >
                                    Read Article
                                    <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Internal linking hub */}
                <div className="mt-20 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-10 text-center text-white">
                    <h2 className="text-2xl font-black mb-3">
                        Ready to Go Beyond the Blog?
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-lg mx-auto font-medium">
                        Browse our full catalog of generative AI courses online, or check our
                        transparent pricing to find the plan that suits your budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all"
                        >
                            Browse AI Courses <FaArrowRight className="text-sm" />
                        </Link>
                        <Link
                            to="/pricing"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-500 transition-all border border-indigo-400"
                        >
                            View Pricing <FaArrowRight className="text-sm" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
