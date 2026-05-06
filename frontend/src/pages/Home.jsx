import React from 'react';
import { Link } from 'react-router-dom';
import { CertificationSteps } from '../components/CertificationSteps';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaCheckCircle, FaStar } from 'react-icons/fa';
import { AuroraBackground } from '../components/ui/aurora-background';
import SEOHelmet from '../components/common/SEOHelmet';

// ── Organisation + WebPage schema for the homepage ─────────────────────────
const HOME_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'GenAI Course — Learn Generative AI Online with Certification',
    url: 'https://genaicourse.io/',
    description:
        'Master Generative AI with expert-led online courses. Get AI-certified, boost your career, and learn AI for beginners to advanced.',
    breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genaicourse.io/' },
        ],
    },
    mainEntity: {
        '@type': 'ItemList',
        name: 'Generative AI Courses Online',
        description: 'Browse our catalog of AI certification courses',
        url: 'https://genaicourse.io/courses',
    },
};

const Home = () => {
    return (
        <div className="min-h-screen relative bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

            {/* ── SEO META ────────────────────────────────────────────────── */}
            <SEOHelmet
                title="Learn Generative AI Online | Best AI Courses with Certification 2026"
                description="Master Generative AI with expert-led online courses. Get certified, boost your career, and learn AI — from beginner to advanced. Job-ready AI certification courses at genaicourse.io."
                canonical="/"
                ogType="website"
                schema={HOME_SCHEMA}
                breadcrumb={[{ name: 'Home', url: '/' }]}
            />

            {/* ── ULTRA-CLEAN APPLE-STYLE HERO ────────────────────────────── */}
            <AuroraBackground showBottomFade className="pt-32 pb-20 overflow-hidden">

                <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">

                    {/* Premium Launch Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-slate-50 border border-slate-200/60 shadow-sm"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-slate-600 tracking-wide">
                            Introducing our Generative AI Courses
                        </span>
                    </motion.div>

                    {/* H1 — Primary keyword target: "learn generative AI online" */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight text-slate-900 leading-[1.05] mb-8"
                    >
                        Build your AI knowledge,{' '}
                        <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                            Become the Best!
                        </span>
                    </motion.h1>

                    {/* Subheadline — secondary keywords: "AI certification course" + "learn AI online" */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl sm:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        Professional-grade generative AI courses with certification — designed for
                        clarity, built for career impact. Learn AI online at your own pace.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/register"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                            aria-label="Start learning generative AI — create free account"
                        >
                            Start Learning Free <FaArrowRight className="text-sm opacity-80" />
                        </Link>
                        <Link
                            to="/courses"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-sm border border-slate-200 hover:border-slate-300"
                            aria-label="Browse all AI courses online"
                        >
                            <FaPlay className="text-sm opacity-60" /> Browse AI Courses
                        </Link>
                    </motion.div>
                </div>

                {/* Dashboard / Workspace Preview Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="container mx-auto px-4 mt-20 relative z-10"
                >
                    <div className="max-w-[800px] mx-auto rounded-3xl border border-slate-200/60 bg-white/40 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 overflow-hidden relative">
                        {/* macOS style window header */}
                        <div className="flex items-center gap-2 mb-4 ml-2">
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                        </div>

                        <div className="w-full h-[530px] rounded-2xl overflow-hidden shadow-inner bg-black border border-slate-800">
                            <iframe
                                src="/genai-video.html"
                                title="GenAI Course — Generative AI Training Preview"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </motion.div>

            </AuroraBackground>

            {/* Certification Steps */}
            <div className="relative z-20 bg-white">
                <CertificationSteps />
            </div>



            {/* ── Bottom CTA — Refined Apple Style ────────────────────────── */}
            <section className="py-40 relative text-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
                </div>
                <div className="container relative z-10 max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                            Start your AI journey, <br className="hidden md:block" />
                            <span className="text-slate-400">today.</span>
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
                            Join thousands of learners who have earned their AI certification and
                            transformed their careers with generative AI courses online.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
                            aria-label="Create a free GenAI Course account"
                        >
                            Create Free Account <FaArrowRight className="text-sm opacity-80" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
