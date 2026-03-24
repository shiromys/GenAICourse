import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaBolt, FaTag } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import paymentService from '../services/paymentService';
import { toast } from 'react-toastify';

const Pricing = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [bundlePricing, setBundlePricing] = useState(null);
    const [loadingPrice, setLoadingPrice] = useState(false);

    // Fetch real-time upgrade price for authenticated users
    useEffect(() => {
        if (isAuthenticated) {
            setLoadingPrice(true);
            paymentService.getBundlePrice()
                .then(res => {
                    if (res.success) setBundlePricing(res.data);
                })
                .catch(() => {
                    // Silently fail — fall back to showing the standard $159 price
                })
                .finally(() => setLoadingPrice(false));
        }
    }, [isAuthenticated]);

    const hasCredit = bundlePricing && bundlePricing.creditApplied > 0;
    const isOwned = user?.hasAllCoursesAccess;
    const displayPrice = isOwned ? '$0' : (bundlePricing
        ? `$${(bundlePricing.finalAmount / 100).toFixed(0)}`
        : '$159');

    const handleBundlePurchase = async () => {
        if (!isAuthenticated) {
            navigate('/register?redirect=checkout/all&type=all');
            return;
        }

        // If the credit fully covers the bundle, trigger the free upgrade directly
        if (bundlePricing?.isFreeUpgrade) {
            try {
                const result = await paymentService.createCheckoutSession('all', 'all');
                if (result.success && result.freeUpgrade && result.redirectTo) {
                    toast.success('All-Access unlocked via your credits! Redirecting...');
                    window.location.href = result.redirectTo;
                }
            } catch (err) {
                toast.error('Something went wrong. Please try again.');
            }
            return;
        }

        navigate('/checkout/all?type=all');
    };

    return (
        <section id="pricing" className="py-32 bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-100/50 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-slate-100/50 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        genaicourse Pricing
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Simple <span className="text-red-600">and Transparent </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto font-medium text-lg"
                    >
                        Choose the path that fits your learning journey. From individual mastery to all-access professional growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">

                    {/* Single Course Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col group hover:border-red-200 transition-all duration-500"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">One-Course plan</h3>
                            <p className="text-slate-500 font-bold text-sm tracking-wide">Standard Learning Access</p>
                        </div>

                        <div className="flex items-baseline gap-2 mb-10">
                            <span className="text-7xl font-black text-slate-900 tracking-tighter">$29</span>
                            <span className="text-slate-400 font-black text-sm uppercase tracking-widest">/course</span>
                        </div>

                        <div className="space-y-5 mb-12 flex-1">
                            <FeatureItem text="Lifetime access to 1 course" />
                            <FeatureItem text="Course Completion Certificate" />
                            <FeatureItem text="Regular Email Support" />
                            <FeatureItem text="Unlimited Quiz Attempts" />
                        </div>

                        <Link to="/courses" className="w-full py-5 px-8 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-black text-center hover:bg-slate-50 hover:border-slate-200 transition-all text-lg shadow-sm">
                            Browse Courses
                        </Link>
                    </motion.div>

                    {/* Pro Bundle Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#0B0E14] rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative flex flex-col transform hover:scale-[1.02] transition-all duration-500"
                    >
                        <div className="absolute top-0 right-10 -translate-y-1/2">
                            <span className="bg-red-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl ring-4 ring-white/10">
                                {hasCredit ? 'Upgrade Deal' : 'Recommended'}
                            </span>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                                    <FaBolt size={18} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">All Courses pack</h3>
                            </div>
                            <p className="text-slate-400 font-bold text-sm tracking-wide">Uninterrupted Access</p>
                        </div>

                        {/* Dynamic Price Display */}
                        <div className="mb-10 text-white">
                            {loadingPrice ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                                    <span className="text-slate-400 font-bold text-sm">Calculating your price...</span>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        { (hasCredit && !isOwned) && (
                                            <span className="text-4xl font-black text-slate-600 line-through tracking-tighter">$159</span>
                                        )}
                                        <span className="text-7xl font-black tracking-tighter text-white">{displayPrice}</span>
                                        <span className="text-slate-500 font-black text-sm uppercase tracking-widest">one-time</span>
                                    </div>
                                    { (hasCredit && !isOwned) && (
                                        <div className="mt-3 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 w-fit">
                                            <FaTag size={12} className="text-emerald-400" />
                                            <p className="text-emerald-400 font-bold text-xs">
                                                ${(bundlePricing.creditApplied / 100).toFixed(0)} credit applied from {bundlePricing.coursesPurchased} previous purchase{bundlePricing.coursesPurchased > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    )}
                                    { (bundlePricing?.isFreeUpgrade && !isOwned) && (
                                        <p className="text-emerald-400 font-black text-sm mt-2">
                                            Your purchases fully cover the bundle — click to unlock for FREE!
                                        </p>
                                    )}
                                    {isOwned && (
                                        <p className="text-red-500 font-black text-sm mt-2 uppercase tracking-widest">
                                            Access Protocol Active: You own all courses
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="space-y-5 mb-12 flex-1">
                            <FeatureItem text="Access to ALL our Courses" dark />
                            <FeatureItem text="Course Completion Certificate" dark />
                            <FeatureItem text="Priority Support" dark />
                            <FeatureItem text="Unlimited Quiz Attempts" dark />
                            <FeatureItem text="Future Course Updates (Free)" dark />
                        </div>

                         <button
                            onClick={handleBundlePurchase}
                            disabled={isOwned}
                            className={`w-full py-5 px-8 rounded-2xl font-black text-center shadow-[0_20px_40px_rgba(225,29,72,0.3)] transition-all text-lg ${isOwned ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-500'}`}
                        >
                            {isOwned ? 'ALREADY OWNED' : (bundlePricing?.isFreeUpgrade ? 'Unlock for FREE — Credits Applied' : 'Get All-Access Pass')}
                        </button>
                    </motion.div>
                </div>

                {/* Note for non-logged in users */}
                {!isAuthenticated && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-slate-400 text-sm font-medium mt-8"
                    >
                        Already purchased single courses?{' '}
                        <Link to="/login?redirect=pricing" className="text-red-500 font-bold underline underline-offset-4">
                            Log in
                        </Link>{' '}
                        to see your personalised upgrade price.
                    </motion.p>
                )}
            </div>
        </section>
    );
};

const FeatureItem = ({ text, dark }) => (
    <div className="flex items-center gap-4 group">
        <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'bg-red-500' : 'bg-red-100'}`}>
            <FaCheck size={8} className={dark ? 'text-white' : 'text-red-600'} />
        </div>
        <span className={`font-bold transition-colors text-sm uppercase tracking-wide ${dark ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>{text}</span>
    </div>
);

export default Pricing;