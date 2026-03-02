import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { FaLock, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext.jsx';

const CheckoutForm = ({ clientSecret, onSucceeded, amount, courseTitle }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user?.name || 'Student',
                },
            },
        });

        if (error) {
            toast.error(error.message);
            setIsProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            toast.success('Payment succeeded! Unlocking access...');
            onSucceeded();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Secure Transaction</span>
                    <FaShieldAlt className="text-red-600" />
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="font-black text-slate-900">{courseTitle}</h4>
                        <p className="text-xs text-slate-500 font-medium">genaicourse Academy Enrollment</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-red-600">${amount}</span>
                        <p className="text-[10px] text-slate-400 font-bold">USD</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Card Details</label>
                <div className="px-6 py-5 bg-white border border-gray-100 rounded-2xl shadow-inner group focus-within:border-red-500 transition-all">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#0F172A',
                                    '::placeholder': {
                                        color: '#94A3B8',
                                    },
                                    fontFamily: 'Inter, sans-serif',
                                },
                                invalid: {
                                    color: '#E11D48',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    disabled={!stripe || isProcessing}
                    className="w-full btn-premium btn-primary !rounded-2xl !py-5 !text-base !font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Authorizing...
                        </>
                    ) : (
                        <>
                            <FaLock size={14} className="text-white/80" />
                            Confirm Payment
                        </>
                    )}
                </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-slate-300">
                <FaCreditCard size={24} />
                <div className="h-4 w-px bg-slate-100"></div>
                <span className="text-[10px] font-black uppercase tracking-tighter">Stripe Encrypted</span>
            </div>
        </form>
    );
};

export default CheckoutForm;
