import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import paymentService from '../services/paymentService.js';
import CheckoutForm from '../components/payment/CheckoutForm.jsx';
import courseService from '../services/courseService.js';
import Loader from '../components/common/Loader.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaRocket, FaChevronLeft, FaTag } from 'react-icons/fa';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_sample');

const EMAIL_RE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const PaymentPage = () => {
    const { id } = useParams(); // courseId or 'all'
    const [searchParams] = useSearchParams();
    const purchaseType = searchParams.get('type') || 'single';
    const navigate = useNavigate();
    const { isAuthenticated, handleOAuthSuccess } = useAuth();

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [bundlePricing, setBundlePricing] = useState(null);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [isInitiating, setIsInitiating] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (purchaseType === 'single') {
                    const courseRes = await courseService.getCourse(id);
                    setCourse(courseRes.data);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();

        if (purchaseType === 'all') {
            paymentService.getBundlePrice()
                .then(res => { if (res.success) setBundlePricing(res.data); })
                .catch(() => {});
        }
    }, [id, purchaseType]);

    const handlePaymentAction = async () => {
        if (!agreedToPolicy) {
            toast.warn('Please agree to the non-refundable policy to continue.');
            return;
        }

        if (!isAuthenticated) {
            if (!guestEmail.trim() || !EMAIL_RE.test(guestEmail.trim())) {
                toast.warn('Please enter a valid email address to continue as a guest.');
                return;
            }
        }

        try {
            setIsInitiating(true);
            const response = await paymentService.createCheckoutSession(
                id,
                purchaseType,
                !isAuthenticated ? guestEmail.trim() : null
            );

            // A brand-new guest account was created for this checkout — log them
            // in right away so they land on their course already signed in.
            if (response.token) {
                await handleOAuthSuccess(response.token);
            }

            // Free upgrade: credit fully covers the bundle — no Stripe redirect
            if (response.success && response.freeUpgrade && response.redirectTo) {
                toast.success('All-Access unlocked via your credits!');
                window.location.href = response.redirectTo;
                return;
            }

            if (response.success && response.url) {
                window.location.href = response.url;
            } else {
                toast.error(response.message || 'Failed to initiate checkout session.');
            }
        } catch (error) {
            const serverMessage = error?.response?.data?.message;
            const errorCode = error?.response?.data?.code;

            if (errorCode === 'ACCOUNT_EXISTS') {
                toast.info('An account already exists with that email — please log in to continue.');
                navigate(`/login?redirect=${encodeURIComponent(`checkout/${id}?type=${purchaseType}`)}`);
                return;
            }

            const displayMsg = serverMessage || error.message || 'Payment initialization failed.';
            toast.error(`Error: ${displayMsg}`);
            console.error('Checkout Error:', error?.response?.data || error);
        } finally {
            setIsInitiating(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-8 pb-20 selection:bg-blue-50 selection:text-blue-600">
            <div className="container max-w-5xl mx-auto px-4">

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-10 hover:text-blue-600 transition-colors group"
                >
                    <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Terminal
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side: Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">
                                Secure Upgrade
                            </span>
                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mt-6 leading-tight tracking-tight">
                                Course Enrollment.
                            </h1>
                            <p className="text-slate-500 font-medium mt-4 leading-relaxed text-lg">
                                You are about to enroll in this course.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: <FaRocket />, text: 'Access to course' },
                                { icon: <FaShieldAlt />, text: 'Payment processed via Stripe' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                                        {item.icon}
                                    </div>
                                    <span className="text-base font-bold text-slate-700">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-slate-400 italic">
                                * Payments are processed securely via Stripe. Your card information never touches our servers.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Summary & Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-slate-200/40 border border-gray-50 flex flex-col">
                            <div className="mb-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your Selection</span>
                                    <FaShieldAlt className="text-blue-600" />
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xl">{purchaseType === 'all' ? 'All-Access Bundle' : course?.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Course Enrollment</p>
                                    </div>
                                    <div className="text-right">
                                        {purchaseType === 'all' && bundlePricing && bundlePricing.creditApplied > 0 ? (
                                            <>
                                                <div className="text-base font-bold text-slate-400 line-through">${(bundlePricing.bundlePrice / 100).toFixed(0)}</div>
                                                <span className="text-3xl font-black text-blue-600">${(bundlePricing.finalAmount / 100).toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-black text-blue-600">${purchaseType === 'all' ? 159 : (course?.price || 29)}</span>
                                        )}
                                        <p className="text-[10px] text-slate-400 font-bold">USD</p>
                                    </div>
                                </div>
                                {purchaseType === 'all' && bundlePricing && bundlePricing.creditApplied > 0 && (
                                    <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                        <FaTag size={10} className="text-emerald-600" />
                                        <p className="text-emerald-700 font-bold text-xs">
                                            ${(bundlePricing.creditApplied / 100).toFixed(0)} credit from {bundlePricing.coursesPurchased} previous purchase{bundlePricing.coursesPurchased > 1 ? 's' : ''} applied
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6 flex-1">
                                {!isAuthenticated && (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-[15px] rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block p-4 transition-all outline-none font-medium placeholder:text-slate-400"
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <p className="text-xs text-slate-400 font-medium ml-1">
                                            No account needed to pay — we'll send your receipt here and you can start the course right away.
                                            Already have an account?{' '}
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/login?redirect=${encodeURIComponent(`checkout/${id}?type=${purchaseType}`)}`)}
                                                className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2"
                                            >
                                                Log in
                                            </button>{' '}
                                            instead.
                                        </p>
                                    </div>
                                )}

                                <div className="p-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50/30">
                                    <div className="flex items-start gap-3">
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                id="refund-policy"
                                                checked={agreedToPolicy}
                                                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            />
                                        </div>
                                        <label htmlFor="refund-policy" className="text-sm text-slate-600 font-medium cursor-pointer select-none leading-relaxed">
                                            I understand that this digital purchase is <span className="font-black text-blue-600">non-refundable</span>. I agree to the terms and wish to proceed with the activation.
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePaymentAction}
                                    disabled={isInitiating}
                                    className={`w-full btn-premium btn-primary !rounded-[2rem] !py-6 !text-lg !font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-500/20 ${isInitiating ? 'opacity-70' : ''}`}
                                >
                                    {isInitiating ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Connecting to Gateway...
                                        </>
                                    ) : (
                                        'Continue to Payment'
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                                Verified & Encrypted by <span className="text-slate-600">Stripe</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaymentPage;
