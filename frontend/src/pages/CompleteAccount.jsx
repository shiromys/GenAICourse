import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCircleCheck } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import SEOHelmet from '../components/common/SEOHelmet';

/**
 * Shown to a guest account (created automatically during checkout) to
 * convert it into a full account — real name + password, so they can log
 * back in from any device and (per backend rules) unlock certificate
 * downloads, which are withheld from guest accounts.
 */
const CompleteAccount = () => {
    const { user, completeAccountSetup } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirect');

    const [formData, setFormData] = useState({ name: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const result = await completeAccountSetup({ name: formData.name, password: formData.password });
            toast.success(result.message || 'Account setup complete!');
            navigate(redirectPath ? `/${redirectPath}` : '/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not complete account setup');
        } finally {
            setLoading(false);
        }
    };

    // Not a guest (or not logged in) — nothing to set up here.
    if (user && !user.isGuest) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 pt-32 pb-24 text-center">
                <FaCircleCheck className="text-blue-500 text-5xl mb-6" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Your account is already set up</h1>
                <p className="text-slate-500 font-medium mb-8">There's nothing to complete here.</p>
                <button onClick={() => navigate('/dashboard')} className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all">
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center bg-[#F8FAFC] relative overflow-hidden pt-32 pb-24 px-4">
            <SEOHelmet title="Complete Your Account" noIndex={true} />

            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400 rounded-full blur-[140px] opacity-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400 rounded-full blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-[460px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden relative z-10"
            >
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-5">
                            <FaUser size={22} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Complete Your Account</h2>
                        <p className="text-slate-500 font-medium">
                            You checked out as a guest{user?.email ? ` (${user.email})` : ''}. Set a name and password
                            to save your account and access it from any device.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block p-4 transition-all outline-none font-medium placeholder:text-slate-400"
                                placeholder="This will appear on your certificates"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block p-4 pr-10 transition-all outline-none font-medium placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 font-medium ml-1">At least 6 characters, with an uppercase letter, a lowercase letter, and a number.</p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block p-4 transition-all outline-none font-medium placeholder:text-slate-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-2xl text-[16px] shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 mt-6 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Save My Account'
                            )}
                        </motion.button>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="w-full text-center text-sm text-slate-400 font-semibold hover:text-slate-600 transition-colors mt-2"
                        >
                            I'll do this later
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CompleteAccount;
