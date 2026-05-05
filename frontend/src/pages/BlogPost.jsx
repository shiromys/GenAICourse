/**
 * BlogPost.jsx — Individual blog article page
 *
 * Uses static article data from Blog.jsx BLOG_POSTS array.
 * Each article targets a specific long-tail keyword.
 * Includes BlogPosting JSON-LD schema for rich results.
 */

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCalendar, FaClock, FaShare } from 'react-icons/fa';
import SEOHelmet from '../components/common/SEOHelmet';
import { BLOG_POSTS } from './Blog';

// ── Full article content map ──────────────────────────────────────────────
// Each article is keyword-rich, naturally written, and structured with H2/H3
const ARTICLE_CONTENT = {

    'best-generative-ai-course-for-beginners-2026': {
        intro: `Generative AI is no longer a niche skill reserved for machine learning researchers. In 2026, it's one of the most sought-after capabilities across every industry — from marketing and customer service to software engineering and healthcare. If you're searching for the best generative AI course for beginners, this guide will help you cut through the noise.`,
        sections: [
            {
                h2: 'What Should a Beginner AI Course Cover?',
                body: `The best generative AI course for beginners doesn't just teach theory — it gives you practical skills you can apply immediately. Look for courses that cover: how large language models (LLMs) work, how to use tools like ChatGPT, Midjourney, and Claude in professional contexts, prompt engineering techniques, AI workflow automation, and the ethical implications of generative AI. A course that only teaches you how to "use ChatGPT" is not enough. You want structured learning that builds a transferable skillset employers recognise.`,
            },
            {
                h2: 'Why Certification Matters for Beginners',
                body: `When you're new to AI, a verifiable AI certification is your signal to employers. It shows you've committed time to structured learning, can demonstrate measurable knowledge, and have reached a validated standard. Unlike freely available YouTube tutorials, a certification course with an assessed exam adds credibility to your CV and LinkedIn profile.`,
            },
            {
                h2: 'How to Choose the Right Generative AI Course',
                body: `Before enrolling, ask: Is the content current? AI tools change rapidly, and 2024 content may already be outdated in 2026. Does the course provide a verifiable certificate? Can non-programmers follow along? Is there a final assessment, not just passive watching? GenAI Course was designed with these criteria in mind — every module is beginner-friendly, regularly updated, and culminates in an assessed certification.`,
            },
            {
                h2: 'Start Your AI Journey Today',
                body: `The best time to start learning generative AI was a year ago. The second best time is today. Browse our beginner AI courses, many of which are available from $29 with a verifiable certificate included.`,
            },
        ],
    },

    'ai-course-for-non-programmers': {
        intro: `A persistent myth in the AI education space is that you need to be a programmer to learn AI. That's simply not true in 2026. Generative AI has created an entirely new category of AI skills that don't require writing a single line of code — and employers are actively seeking people with these skills.`,
        sections: [
            {
                h2: 'AI Skills That Don\'t Require Programming',
                body: `Prompt engineering, AI tool workflow design, AI content strategy, AI project management, and AI quality assurance are all in-demand roles that don't require traditional programming knowledge. If you work in marketing, operations, sales, HR, or finance, generative AI tools can supercharge your productivity — and a structured course will show you exactly how.`,
            },
            {
                h2: 'What to Look for in an AI Course for Non-Programmers',
                body: `The right course should use plain language explanations of AI concepts, focus on practical tools rather than algorithms, include real-world exercises you can complete without coding, and offer a certificate you can use on your CV. Many AI courses are aimed at developers. GenAI Course is built for everyone.`,
            },
            {
                h2: 'Career Outcomes for Non-Programmers with AI Skills',
                body: `Non-programmers who complete an AI certification course frequently move into roles such as AI Prompt Engineer, AI Content Strategist, AI Automation Specialist, and AI Consultant. These are growing roles, and in many organisations, the AI-savvy non-programmer is more valuable than a developer who doesn't understand the business context.`,
            },
        ],
    },

    'ai-course-with-certificate-usa': {
        intro: `Whether you're based in New York, Texas, California, or anywhere else in the US, earning an AI certification online has never been more accessible — or more strategically important for your career. Here's what you need to know about AI courses with certificates in the USA in 2026.`,
        sections: [
            {
                h2: 'Do US Employers Recognise Online AI Certificates?',
                body: `Yes — increasingly so. The rise of remote work and skills-based hiring has shifted employer attitudes. A verifiable online AI certificate from a credible provider signals practical, current knowledge. Many hiring managers at tech companies, consulting firms, and Fortune 500s actively look for AI-certified candidates on LinkedIn.`,
            },
            {
                h2: 'What Makes an AI Certificate Credible?',
                body: `Look for certificates that are publicly verifiable (shareable via a unique URL), awarded after completing an assessed exam (not just watching videos), issued by an organisation with domain authority in AI education, and hosted on a professional platform with a real support team. GenAI Course issues verifiable certificates with public QR code verification — making them easy to include on job applications and share with US employers.`,
            },
            {
                h2: 'AI Certification Cost in the USA',
                body: `University AI programmes in the US often cost thousands of dollars. Online AI courses on GenAI Course start from $29 per course, with an all-access bundle available for a one-time payment. This makes professional AI certification accessible regardless of your budget.`,
            },
        ],
    },

    'ai-certification-cost-worth-it': {
        intro: `"How much does an AI certification cost?" is one of the most-searched questions by people entering the AI field in 2026. The range is enormous — from free YouTube content to $10,000+ university programmes. The real question isn't just cost; it's value.`,
        sections: [
            {
                h2: 'AI Certification Cost: The Spectrum',
                body: `Free resources (YouTube, blog posts) cost $0 but offer no certification and no structured progression. University-level AI programmes range from $3,000 to $30,000+ and take months or years. Professional online AI courses on platforms like GenAI Course cost $29–$159 and offer structured learning with a verifiable certificate at the end. For most people entering the AI workforce, the professional online course sits in the sweet spot of cost, speed, and credibility.`,
            },
            {
                h2: 'Is a $29 AI Course Actually Worth It?',
                body: `Yes — if it's structured, assessed, and certified. The cost of the course is not the measure of its value. A $29 AI certification course that gives you a verified credential, practical skills, and a portfolio to show employers is worth more than a $500 course you never finish. GenAI Course courses are designed to be completed in hours, not months, with a final assessment that makes the certificate meaningful.`,
            },
            {
                h2: 'Return on Investment from AI Certification',
                body: `AI-skilled workers earn on average significantly more than their non-AI counterparts in equivalent roles. Whether you're seeking a promotion, a career change, or a new client base as a freelancer, an AI certification is a high-ROI investment at any price point.`,
            },
        ],
    },

    'job-ready-ai-course-what-to-learn': {
        intro: `"Job-ready" is one of the most overused phrases in online education. But when it comes to AI, it has a specific meaning: you can apply AI tools, workflows, and concepts to real business problems on day one. Here's what a genuinely job-ready AI course looks like in 2026.`,
        sections: [
            {
                h2: 'Skills That Make You Job-Ready in AI',
                body: `Employers in 2026 are looking for candidates who can use LLMs to automate repetitive tasks, design and evaluate AI prompts for specific outcomes, integrate AI tools into existing business workflows, understand AI ethics, bias, and responsible deployment, and communicate AI capabilities and limitations to non-technical stakeholders. A course that covers all of these — not just one or two — is genuinely job-ready.`,
            },
            {
                h2: 'Why a Verifiable Certificate Matters',
                body: `A job-ready AI course should end with an assessed certification, not just a completion badge. The assessment validates that you've understood the material, not just watched it. Employers increasingly ask candidates to share certificate verification links — a static PDF is not enough.`,
            },
            {
                h2: 'Start Your Job-Ready AI Journey',
                body: `Browse GenAI Course's curriculum to find the course that aligns with your target role. Every course ends with a final exam and a publicly verifiable certificate.`,
            },
        ],
    },

    'learn-ai-online-complete-guide': {
        intro: `Learning AI online in 2026 has never been more accessible — or more confusing. There are hundreds of platforms, thousands of YouTube videos, and dozens of certification providers. This guide cuts through the clutter and gives you a clear, step-by-step path to learning AI online and building a career-ready skillset.`,
        sections: [
            {
                h2: 'Step 1: Understand What "Learning AI" Actually Means',
                body: `AI is a broad field. For most career-focused learners in 2026, the most practical starting point is generative AI — specifically how to use, direct, and build workflows around large language models (LLMs) and image generation tools. You don't need to learn maths or Python to get started.`,
            },
            {
                h2: 'Step 2: Choose a Structured Course (Not Just YouTube)',
                body: `Passive consumption of YouTube tutorials doesn't lead to a job. A structured AI course gives you a curriculum that builds on itself, exercises to test your understanding, and a certificate at the end that employers can verify. When choosing a course, check that it's been updated in the last 12 months — AI moves fast.`,
            },
            {
                h2: 'Step 3: Get Assessed and Certified',
                body: `After completing your AI course, take the final assessment seriously. This is what earns you a verifiable certificate. Your GenAI Course certificate includes a unique verification link and QR code — share it on LinkedIn, add it to your CV, and include it in job applications.`,
            },
            {
                h2: 'Step 4: Apply Your Skills and Build a Portfolio',
                body: `The best way to land a job with AI skills is to demonstrate them. Build simple AI-powered projects, write about what you've learned, and contribute to discussions on LinkedIn or in AI communities. Your certificate opens the door; your portfolio keeps it open.`,
            },
        ],
    },
};

const BlogPost = () => {
    const { slug } = useParams();

    const post = BLOG_POSTS.find(p => p.slug === slug);
    const content = ARTICLE_CONTENT[slug];

    if (!post || !content) {
        return <Navigate to="/blog" replace />;
    }

    // ── BlogPosting JSON-LD ────────────────────────────────────────────
    const postSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `https://genaicourse.io/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'en',
        author: {
            '@type': 'Organization',
            name: 'GenAI Course',
            url: 'https://genaicourse.io',
        },
        publisher: {
            '@type': 'EducationalOrganization',
            name: 'GenAI Course',
            url: 'https://genaicourse.io',
            logo: { '@type': 'ImageObject', url: 'https://genaicourse.io/logo.png' },
        },
        image: 'https://genaicourse.io/logo-large.png',
        keywords: post.primaryKeyword,
        articleSection: post.category,
        mainEntityOfPage: `https://genaicourse.io/blog/${post.slug}`,
    };

    // Find adjacent posts for internal linking
    const currentIdx = BLOG_POSTS.findIndex(p => p.slug === slug);
    const prevPost = BLOG_POSTS[currentIdx - 1] || null;
    const nextPost = BLOG_POSTS[currentIdx + 1] || null;

    return (
        <div className="min-h-screen bg-white pt-28 pb-20">

            {/* ── SEO META ────────────────────────────────────────────────── */}
            <SEOHelmet
                title={post.title}
                description={post.excerpt}
                canonical={`/blog/${post.slug}`}
                ogType="article"
                schema={postSchema}
                breadcrumb={[
                    { name: 'Home', url: '/' },
                    { name: 'AI Blog', url: '/blog' },
                    { name: post.title, url: `/blog/${post.slug}` },
                ]}
            />

            <article className="container max-w-3xl mx-auto px-6" itemScope itemType="https://schema.org/BlogPosting">

                {/* Breadcrumb nav */}
                <nav aria-label="Breadcrumb" className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
                        <li>/</li>
                        <li><Link to="/blog" className="hover:text-indigo-600">Blog</Link></li>
                        <li>/</li>
                        <li className="text-gray-600 font-medium truncate max-w-[200px]">{post.title}</li>
                    </ol>
                </nav>

                {/* Back button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-semibold text-sm mb-10 transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <FaClock size={10} /> {post.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <FaCalendar size={10} />
                            <time dateTime={post.date} itemProp="datePublished">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                })}
                            </time>
                        </span>
                    </div>

                    {/* H1 */}
                    <h1
                        className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6"
                        itemProp="headline"
                    >
                        {post.title}
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed font-medium" itemProp="description">
                        {post.excerpt}
                    </p>
                </motion.header>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-transparent mb-12" />

                {/* Article Body */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg max-w-none"
                    itemProp="articleBody"
                >
                    {/* Intro */}
                    <p className="text-slate-600 text-lg leading-relaxed mb-10">
                        {content.intro}
                    </p>

                    {/* Sections */}
                    {content.sections.map((section, idx) => (
                        <section key={idx} className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 mt-8">
                                {section.h2}
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {section.body}
                            </p>
                        </section>
                    ))}
                </motion.div>

                {/* CTA Box */}
                <div className="mt-16 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-3">
                        Ready to Start Learning AI Online?
                    </h2>
                    <p className="text-slate-500 mb-6">
                        Browse our generative AI courses and earn your AI certification starting from $29.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-indigo-600 transition-all"
                        >
                            Browse AI Courses <FaArrowRight className="text-sm" />
                        </Link>
                        <Link
                            to="/pricing"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 font-bold px-8 py-3 rounded-2xl hover:bg-slate-50 transition-all"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Prev / Next internal links */}
                {(prevPost || nextPost) && (
                    <nav
                        className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6"
                        aria-label="Article navigation"
                    >
                        {prevPost && (
                            <Link
                                to={`/blog/${prevPost.slug}`}
                                className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all"
                            >
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1">
                                    <FaArrowLeft size={10} /> Previous
                                </span>
                                <span className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                                    {prevPost.title}
                                </span>
                            </Link>
                        )}
                        {nextPost && (
                            <Link
                                to={`/blog/${nextPost.slug}`}
                                className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-right ml-auto w-full"
                            >
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-2 flex items-center gap-1 justify-end">
                                    Next <FaArrowRight size={10} />
                                </span>
                                <span className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                                    {nextPost.title}
                                </span>
                            </Link>
                        )}
                    </nav>
                )}
            </article>
        </div>
    );
};

export default BlogPost;
