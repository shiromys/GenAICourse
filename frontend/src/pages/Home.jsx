import React from 'react';
import { Link } from 'react-router-dom';
import { CertificationSteps } from '../components/CertificationSteps';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaCheckCircle, FaStar } from 'react-icons/fa';
import { AuroraBackground } from '../components/ui/aurora-background';

const Home = () => {
    return (
        <div className="min-h-screen relative bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

            {/* ── ULTRA-CLEAN APPLE-STYLE HERO ────────────────────────────── */}
            <AuroraBackground className="pt-32 pb-20 overflow-hidden">

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
                            Introducing AI Mastery Paths
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight text-slate-900 leading-[1.05] mb-8"
                    >
                        Master the future.{' '}
                        <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                            Beautifully.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl sm:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        Professional-grade courses defining the standard for Artificial Intelligence education. Designed for clarity, built for impact.
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
                        >
                            Start Learning Free <FaArrowRight className="text-sm opacity-80" />
                        </Link>
                        <Link
                            to="/courses"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-sm border border-slate-200 hover:border-slate-300"
                        >
                            <FaPlay className="text-sm opacity-60" /> Browse Courses
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
                    <div className="max-w-5xl mx-auto rounded-t-3xl border-t border-x border-slate-200/60 bg-white/40 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 overflow-hidden relative">
                        {/* macOS style window header */}
                        <div className="flex items-center gap-2 mb-6 ml-2">
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                            <div className="w-3 h-3 rounded-full bg-slate-300" />
                        </div>

                        {/* Fake UI grid layout mimicking an Apple-style clean dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-4">
                                <div className="h-48 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-slate-100 flex items-center justify-center shadow-sm">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-3">
                                            <FaPlay className="text-indigo-500 text-xl" />
                                        </div>
                                        <div className="h-4 w-32 bg-slate-200/60 rounded-full mx-auto mb-2" />
                                        <div className="h-3 w-20 bg-slate-100 rounded-full mx-auto" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 mb-3" />
                                        <div className="h-3 w-3/4 bg-slate-100 rounded-full mb-2" />
                                        <div className="h-2 w-1/2 bg-slate-50 rounded-full" />
                                    </div>
                                    <div className="h-32 rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-50 mb-3" />
                                        <div className="h-3 w-3/4 bg-slate-100 rounded-full mb-2" />
                                        <div className="h-2 w-1/2 bg-slate-50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-20 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center p-3 gap-4">
                                        <div className="h-12 w-16 bg-slate-50 rounded-xl" />
                                        <div className="space-y-2 flex-1">
                                            <div className="h-2 w-full bg-slate-100 rounded-full" />
                                            <div className="h-2 w-2/3 bg-slate-50 rounded-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom fade out gradient */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                    </div>
                </motion.div>

            </AuroraBackground>

            {/* Certification Steps */}
            <div className="relative z-20 bg-white">
                <CertificationSteps />
            </div>



            {/* Bottom CTA — Refined Apple Style */}
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
                            Start building your future. <br className="hidden md:block" />
                            <span className="text-slate-400">Today.</span>
                        </h2>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:bg-indigo-600 hover:-translate-y-1 transition-all duration-300"
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
