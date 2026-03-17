import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaCopyright, FaUserShield, FaBan } from 'react-icons/fa';

/**
 * TermsOfUse Page
 * Integrates the full platform protocols for GenAICourse.IO
 */
const TermsOfUse = () => {
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
                        <FaFileContract size={36} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-brand tracking-tighter uppercase mb-4">
                        Terms of Use
                    </h1>

                </motion.div>

                {/* Content Card with Neural Aesthetic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card bg-white p-8 md:p-16 border border-slate-200 shadow-xl rounded-[2.5rem] relative overflow-hidden"
                >
                    {/* Decorative Watermark */}
                    <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none rotate-12">
                        <FaFileContract size={200} />
                    </div>

                    <div className="prose prose-slate prose-lg max-none relative z-10 text-slate-600 leading-relaxed font-medium">

                        <section className="mb-12">
                            <h2 className="text-brand font-black text-2xl mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
                            <p>
                                By accessing <strong>genaicourse.io</strong>, you agree to be legally bound by these Terms of Use.
                                If you do not agree with any part of these protocols, you are prohibited from using the service.
                            </p>
                        </section>

                        <section className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCopyright className="text-indigo-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight">2. Intellectual Property</h2>
                            </div>
                            <p>
                                All original content, including video lectures, proprietary prompts, and code snippets, remains the exclusive property of **GenAICourse**.
                                Users are granted a limited, personal license to learn, subject to the following strict restrictions:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                                <li>No reproduction or redistribution of course materials.</li>
                                <li>No sharing of account credentials with third parties.</li>
                                <li>No commercial reselling of GenAICourse content.</li>
                            </ul>
                        </section>

                        <section className="mb-12 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <FaUserShield className="text-indigo-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight">3. Certificates & Identity</h2>
                            </div>
                            <p>
                                Certificates are issued based on the profile name provided at the time of account creation.
                                You agree that this name matches your legal identity.
                                To maintain the integrity of our verification system, **names cannot be altered once a certificate has been generated**.
                            </p>
                        </section>

                        <section className="mb-0 p-8 bg-red-50 rounded-3xl border border-red-100">
                            <div className="flex items-center gap-3 mb-4">
                                <FaBan className="text-red-600" size={24} />
                                <h2 className="text-brand font-black text-2xl m-0 uppercase tracking-tight text-red-900">4. Termination of Access</h2>
                            </div>
                            <p className="text-red-800">
                                We reserve the right to suspend or terminate your access immediately, without prior notice, for conduct that we believe violates these Terms.
                                This includes, but is not limited to, "group buying" or account-sharing behaviour.
                            </p>
                        </section>

                    </div>
                </motion.div>


            </div>
        </div>
    );
};

export default TermsOfUse;