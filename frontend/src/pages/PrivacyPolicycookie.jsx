import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Database, Bell } from 'lucide-react';
import { AuroraBackground } from '../components/ui/aurora-background';

const PrivacyPolicycookie = () => {
    const lastUpdated = "April 6, 2026";

    const sections = [
        {
            title: "Data Collection",
            icon: <Database className="text-amber-400" />,
            content: "We collect your name, email, and encrypted password to manage your account via JWT. We also track your course progress and assessment scores to issue verified certificates."
        },
        {
            title: "Security Standards",
            icon: <Lock className="text-indigo-400" />,
            content: "Your data is protected by 256-bit SSL encryption. Our servers run in a secure, non-root Docker environment to prevent unauthorized access."
        },
        {
            title: "Cookie Usage",
            icon: <Eye className="text-emerald-400" />,
            content: "We use strictly necessary cookies for login sessions. Optional analytics (Google) and marketing (Meta) cookies are only activated if you click 'Accept All'."
        }
    ];

    return (
        <AuroraBackground dark className="min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <ShieldCheck size={14} /> Legal Compliance
                    </motion.div>
                    <h1 className="text-5xl font-black text-white tracking-tight mb-4">
                        Privacy <span className="text-indigo-500">Policy</span>
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Last Updated: {lastUpdated} • GenAiCourse.io
                    </p>
                </div>

                {/* KPI-style Quick Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {sections.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#0F172A]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-white font-bold mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                {item.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Content Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 text-slate-300 space-y-8 leading-relaxed"
                >
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileText className="text-indigo-500" /> 1. Information We Collect
                        </h2>
                        <p>
                            To provide a high-quality learning experience, we collect basic profile information (Name, Email) and academic data (Course enrollment, lesson progress, and quiz attempts). Payment information is processed exclusively by <strong>Stripe</strong>; we never store your credit card details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Database className="text-indigo-500" /> 2. How We Use Data
                        </h2>
                        <p>
                            Your data is used to track your journey from enrollment to certification. Specifically, we use your scores to generate unique, verifiable PDF certificates using <strong>PDFKit</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <ShieldCheck className="text-indigo-500" /> 3. Data Protection
                        </h2>
                        <p>
                            We implement 256-bit SSL encryption for all data transfers. Our infrastructure uses Docker containerization with non-root user permissions to ensure a secure environment for your educational records.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Bell className="text-indigo-500" /> 4. Your Rights
                        </h2>
                        <p>
                            Under GDPR, you have the right to access, correct, or delete your personal data. You can manage your tracking preferences via our consent banner or by clearing your browser's local storage.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-white/10 text-center">
                        <p className="text-sm text-slate-500">
                            Have questions? Contact our privacy team at <span className="text-indigo-400 font-bold">privacy@genaicourse.io</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AuroraBackground>
    );
};

export default PrivacyPolicycookie;