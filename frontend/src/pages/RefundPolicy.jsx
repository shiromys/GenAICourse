import React from 'react';
import { motion } from 'framer-motion';
import { FaUndo, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaTools } from 'react-icons/fa';

/**
 * RefundPolicy Page
 * Integrates the official financial protocols for GenAICourse.IO
 */
const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] pt-32 pb-20 selection:bg-red-50 selection:text-red-600">
            <div className="container max-w-4xl mx-auto px-6">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-red-50">
                        <FaUndo size={36} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-brand tracking-tighter uppercase mb-4">
                        Refund Policy
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Financial Protocol v1.0 • Updated: February 26, 2026
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
                        <FaUndo size={200} />
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none relative z-10 text-slate-600 leading-relaxed font-medium">

                        <div className="bg-red-600 text-white p-8 rounded-3xl mb-12 shadow-xl shadow-red-900/10">
                            <div className="flex items-center gap-4 mb-4">
                                <FaExclamationTriangle size={24} />
                                <h2 className="text-white font-black text-2xl m-0 uppercase tracking-tight">General Policy</h2>
                            </div>
                            <p className="m-0 font-bold opacity-90 leading-loose">
                                Due to the digital nature of our training materials and the immediate delivery of intellectual property upon purchase, **GenAICourse generally does not offer refunds**.
                                By completing a transaction, you acknowledge that **all sales are final**.
                            </p>
                        </div>

                        <section className="mb-12">
                            <h2 className="text-brand font-black text-2xl mb-6 uppercase tracking-tight flex items-center gap-3">
                                <FaTools className="text-indigo-600" />
                                Valid Exceptions
                            </h2>
                            <p>We will review and potentially approve refund requests only under the following specific conditions:</p>
                            <div className="grid grid-cols-1 gap-4 mt-6">
                                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                    <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-black text-brand uppercase text-sm m-0">Duplicate Billing</h4>
                                        <p className="text-xs font-medium m-0">You were erroneously charged multiple times for the same module due to a payment gateway glitch.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="border-t border-slate-100 pt-12">
                            <h2 className="text-brand font-black text-2xl mb-4 uppercase tracking-tight flex items-center gap-3">
                                <FaTimesCircle className="text-red-500" />
                                Non-Refundable Scenarios
                            </h2>
                            <p>Refunds will not be granted for the following reasons:</p>
                            <ul className="list-disc pl-6 space-y-3">
                                <li>"Change of mind" or lack of interest after purchase.</li>
                                <li>Inability to pass course assessments or final certification exams.</li>
                                <li>Dissatisfaction with the difficulty level of the curriculum.</li>
                                <li>Failure to utilise the platform during the access period.</li>
                            </ul>
                        </section>
                    </div>
                </motion.div>


            </div>
        </div>
    );
};

export default RefundPolicy;