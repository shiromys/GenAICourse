import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaFileContract, FaUndo } from 'react-icons/fa';

const LegalLayout = ({ title, lastUpdated, icon: Icon, children }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-6">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-indigo-50">
                        <Icon size={36} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-brand tracking-tighter uppercase mb-4">
                        {title}
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Last Updated: {lastUpdated}
                    </p>
                </motion.div>

                {/* Content Card */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card bg-white p-8 md:p-16 border border-slate-200 shadow-xl rounded-[2.5rem] relative overflow-hidden"
                >
                    {/* Decorative Watermark */}
                    <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none rotate-12">
                        <Icon size={200} />
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none relative z-10 text-slate-600 leading-relaxed font-medium">
                        {children}
                    </div>
                </motion.div>

                {/* Bottom Assistance */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-sm">
                        Questions regarding these protocols? 
                        <a href="mailto:info@genaicourse.io" className="text-indigo-600 ml-1 hover:underline font-bold">
                            Contact Legal Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalLayout;