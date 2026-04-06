import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="fixed bottom-0 left-0 w-full z-[100]"
                >
                    <div className="bg-[#0F172A] border-t border-white/10 rounded-t-[2rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)] backdrop-blur-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="text-indigo-400" size={24} />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">GDPR & Privacy Compliance</h3>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                                    We use strictly necessary cookies to make our site work (256-bit SSL secured). We also use optional analytics (Google) and marketing (Meta) cookies to improve your experience. We do not sell your data.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={handleReject}
                                className="flex-1 md:flex-none px-6 py-3.5 rounded-xl border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
                            >
                                Reject Optional
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none px-8 py-3.5 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)] transition-all active:scale-95"
                            >
                                Accept All
                            </button>
                        </div>

                        {/* Top-right close button for accessibility */}
                        <button 
                            onClick={handleReject}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
