import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Database, Bell } from 'lucide-react';
import { AuroraBackground } from '../components/ui/aurora-background';

// ... (Imports stay the same)

const PrivacyPolicycookie = () => {
    const lastUpdated = "April 6, 2026";

    const sections = [
        // ... (Data Collection and Security stay the same)
        {
            title: "Cookie Usage",
            icon: <Eye className="text-emerald-400" />,
            content: "We use strictly necessary cookies for login sessions. Optional analytics (Google) cookies are only activated if you click 'Accept All'."
        }
    ];

    return (
        <AuroraBackground dark className="min-h-screen pt-28 pb-12">
            {/* ... Header and Grid sections remain identical to your source code */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 text-slate-300 space-y-8 leading-relaxed"
            >
                {/* ... Section 1 and 2 remain identical */}

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <ShieldCheck className="text-indigo-500" /> 3. Cookie Usage
                    </h2>
                    <p>
                        We use strictly necessary cookies for core site functions, such as keeping you logged into your dashboard. Optional analytics (Google) cookies are blocked by default and only activated if you provide explicit consent via our banner. <strong>We do not use marketing or social media tracking pixels.</strong>
                    </p>
                </section>

                {/* ... Section 4 and Footer remain identical */}
            </motion.div>
        </AuroraBackground>
    );
};

export default PrivacyPolicycookie;