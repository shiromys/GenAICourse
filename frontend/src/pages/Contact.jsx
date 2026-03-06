import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            toast.success("Message sent successfully! We'll be in touch soon.");
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
            <div className="max-w-5xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Left Column - Contact Info */}
                    <div className="md:w-5/12 bg-[#0F172A] text-white p-12 lg:p-16 relative overflow-hidden">
                        {/* Decorative background blur */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute top-10 -left-10 w-32 h-32 bg-purple-600 rounded-full blur-[80px] opacity-30"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-black tracking-tight mb-4">Get in touch</h2>
                            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                                Have a question about our AI courses? Need help with a certificate? We're here to help.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="mt-1 flex-shrink-0 text-red-500">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">Email Address</div>
                                        <div className="text-white font-medium">info@genaicourse.io</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="mt-1 flex-shrink-0 text-red-500">
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">Phone</div>
                                        <div className="text-white font-medium">+1 (555) 123-4567</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="mt-1 flex-shrink-0 text-red-500">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">Office</div>
                                        <div className="text-white font-medium leading-relaxed">
                                            5080 Spectrum Drive, Suite 575E<br />
                                            Addison, TX 75001
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:w-7/12 p-12 lg:p-16 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-black text-slate-500 tracking-widest uppercase mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-black text-slate-500 tracking-widest uppercase mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@company.com"
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-xs font-black text-slate-500 tracking-widest uppercase mb-2">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium appearance-none"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Course Support">Course Support</option>
                                    <option value="Certificate Verification">Certificate Verification</option>
                                    <option value="Billing & Pricing">Billing & Pricing</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-black text-slate-500 tracking-widest uppercase mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us how we can help..."
                                    required
                                    rows="4"
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium placeholder-slate-400 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#E53E3E] hover:bg-[#C53030] text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FaPaperPlane size={14} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
