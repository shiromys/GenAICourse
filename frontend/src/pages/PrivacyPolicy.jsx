import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaServer, FaHandshake } from 'react-icons/fa';

/**
 * PrivacyPolicy Page
 * Integrates the official protocols for GenAICourse.IO
 */
const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] pt-32 pb-20 selection:bg-indigo-100 selection:text-indigo-600">
            <div className="container max-w-4xl mx-auto px-6">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-indigo-50">
                        <FaShieldAlt size={36} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-brand tracking-tighter uppercase mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Last Updated: February 26, 2026
                    </p>
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card bg-white p-8 md:p-16 border border-slate-200 shadow-xl rounded-[2.5rem] relative overflow-hidden"
                >
                    {/* Neural Watermark */}
                    <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none rotate-12">
                        <FaShieldAlt size={200} />
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none relative z-10 text-slate-600 leading-relaxed">

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FaUserSecret className="text-indigo-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight">What We Collect</h2>
                            </div>
                            <p>
                                We collect essential identifiers, including your name, email address, learning telemetry, and quiz performance.
                                All financial transactions are processed through encrypted channels via **Stripe**; we do not store your full payment card details on our servers.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FaServer className="text-indigo-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight">How We Use It</h2>
                            </div>
                            <p>
                                Your data is utilised to maintain your personalised learning dashboard, issue verifiable digital certificates, and improve our AI-driven curriculum.
                                We may also use anonymised interaction data to optimise platform performance and video delivery.
                            </p>
                        </section>

                        <section className="mb-12 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner">
                            <div className="flex items-center gap-3 mb-4">
                                <FaShieldAlt className="text-emerald-500" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight text-emerald-700">Data Security</h2>
                            </div>
                            <p>
                                We employ industry-standard encryption protocols. User credentials and sensitive access tokens are hashed using **bcrypt** before storage.
                                We maintain a strict **"No-Sale" policy**—your personal data is never sold to third-party brokers or external marketing agencies.
                            </p> section section-pt
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <FaHandshake className="text-indigo-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight">Third-Party Services</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                                    <h4 className="font-black text-indigo-600 mb-2 uppercase text-sm">OpenAI</h4>
                                    <p className="text-xs font-medium">Powering 24/7 student support chat</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                                    <h4 className="font-black text-indigo-600 mb-2 uppercase text-sm">Stripe</h4>
                                    <p className="text-xs font-medium">Managing secure payment and billing</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                                    <h4 className="font-black text-indigo-600 mb-2 uppercase text-sm">Resend</h4>
                                    <p className="text-xs font-medium">Used for sending Emails</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </motion.div>


            </div>
        </div>
    );
};

export default PrivacyPolicy;