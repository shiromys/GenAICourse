import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane,
    FaExternalLinkAlt, FaAngleRight, FaArrowRight, FaClock, FaComments
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';
import { AuroraBackground } from '../components/ui/aurora-background';

// ─── Sidebar Box Component (Apple-Style Glassmorphism) ─────────────
const SidebarBox = ({ badge, title, subtitle, description, features, link, accentColor, textColor, bgColor }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative group mb-6"
    >
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white/40 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] transition-all duration-700">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

            <div className="flex justify-between items-start mb-5 relative z-10">
                <span className="bg-slate-900/5 backdrop-blur-sm text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                    {badge}
                </span>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-500 transition-colors duration-300">
                    <FaExternalLinkAlt size={12} />
                </a>
            </div>

            <div className="mb-5 relative z-10">
                <h2 className={`text-[15px] font-black ${textColor} uppercase tracking-[0.25em] mb-1.5`}>{title}</h2>
                <h4 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">{subtitle}</h4>
                {description && <p className="text-slate-500 text-[13px] mt-2.5 leading-relaxed font-medium opacity-80">{description}</p>}
            </div>

            <ul className="space-y-2.5 mb-7 relative z-10">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-slate-600 text-[12px] font-medium leading-tight">
                        <span className={`mt-0.5 flex-shrink-0 ${textColor} opacity-60`}>
                            <FaAngleRight size={10} />
                        </span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <motion.a
                whileHover={{ gap: '12px' }}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-10 inline-flex items-center gap-2 ${bgColor} text-white text-[10px] font-black px-6 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/10 active:scale-95 tracking-[0.1em] uppercase`}
            >
                Learn More <FaArrowRight size={9} />
            </motion.a>
        </div>
    </motion.div>
);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await api.post('/contact', formData);
            if (response.data.success) {
                toast.success(response.data.message || "Message sent successfully!");
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            } else {
                toast.error(response.data.message || "Failed to send message.");
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuroraBackground className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <div className="max-w-[1200px] w-full relative z-10">

                {/* Minimalist Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                            Contact Support
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight"
                    >
                        Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">the future.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed opacity-80"
                    >
                        Expert guidance for the next generation of AI technology.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">

                    {/* Left Sidebar */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <SidebarBox
                            badge="SPONSORED"
                            title="ResumeBlast.AI"
                            subtitle="Resume Blaster"
                            description="The platform to Blast Resumes for Job opportunities."
                            features={["Instant Resume Blast", "Job Opportunities"]}
                            link="https://www.resumeblast.ai/"
                            textColor="text-indigo-500"
                            bgColor="bg-indigo-600"
                        />
                        <SidebarBox
                            badge="SPONSORED"
                            title="DFWIT JOBS"
                            subtitle="Reach IT Talent"
                            description="IT and Tech Job Board for DFW and World Wide."
                            features={["Tech Jobs", "Resume Posting"]}
                            link="https://www.dfwitjobs.com"
                            textColor="text-blue-500"
                            bgColor="bg-blue-600"
                        />
                    </div>

                    {/* Main Form (Matched to Website Style) */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-100"
                        >
                            <div className="p-10 md:p-14">
                                <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Contact Us</h2>
                                <p className="text-slate-500 mb-10 font-medium text-lg">We'll get back to you within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-7">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2.5">
                                            <label className="block text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Jane Smith"
                                                className="w-full bg-slate-50/50 border border-slate-200/60 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/40 transition-all duration-300 font-bold placeholder-slate-300 text-[15px]"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="block text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="you@example.com"
                                                className="w-full bg-slate-50/50 border border-slate-200/60 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/40 transition-all duration-300 font-bold placeholder-slate-300 text-[15px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <label className="block text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase ml-1">Topic / Subject</label>
                                        <div className="relative">
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50/50 border border-slate-200/60 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/40 transition-all duration-300 font-bold appearance-none cursor-pointer text-[15px]"
                                            >
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Course Support">Course Support</option>
                                                <option value="Certificate Verification">Certificate Verification</option>
                                                <option value="Billing & Pricing">Billing & Pricing</option>
                                            </select>
                                            <FaAngleRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={14} />
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <label className="block text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase ml-1">Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="How can we help you today?"
                                            className="w-full bg-slate-50/50 border border-slate-200/60 rounded-[2rem] px-6 py-4.5 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500/40 transition-all duration-300 font-bold placeholder-slate-300 resize-none text-[15px]"
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01, y: -2 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.2em]"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <FaPaperPlane size={14} className="mt-[-2px]" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-3 order-3">
                        <SidebarBox
                            badge="SPONSORED"
                            title="AICOURSEHUBPRO"
                            subtitle="AI Learning"
                            description="Master AI with less theory but more real-life application."
                            features={["Artificial Intelligence", "Clarity over complexity"]}
                            link="https://www.aicoursehubpro.com/"
                            textColor="text-pink-500"
                            bgColor="bg-pink-600"
                        />
                        <SidebarBox
                            badge="SPONSORED"
                            title="Benzaiten LMS"
                            subtitle="Technical-Courses Learning Platform"
                            description="Self-paced, AI-powered LMS for IT upskilling ."
                            features={["Career Growth", "Skill Upgrade"]}
                            link="https://www.benzaitenlms.com"
                            textColor="text-orange-500"
                            bgColor="bg-orange-600"
                        />
                    </div>
                </div>

                {/* Small Aesthetic Office & Map Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Compact Office Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col justify-center h-[240px]"
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <FaMapMarkerAlt size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Our Office</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="font-bold text-slate-900 text-sm">Shiro Technologies LLC.</p>
                                <p className="text-slate-500 font-medium text-[13px] leading-relaxed">
                                    5080 Spectrum Drive, Suite 575E,<br />
                                    Addison, TX 75001
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-[13px] font-bold text-slate-800">
                                <FaPhoneAlt className="text-indigo-400" size={14} />
                                <span>(800) 971-8013</span>
                            </div>
                            <div className="flex items-center gap-3 text-[13px] font-bold text-indigo-600">
                                <FaEnvelope className="text-indigo-400" size={14} />
                                <a href="mailto:info@genaicourse.io" className="hover:underline">info@genaicourse.io</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Compact Map Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-3 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] h-[240px] relative overflow-hidden group"
                    >
                        <iframe
                            title="Office Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.455!2d-96.8266!3d32.9551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c2139fd000001%3A0x47a8cdb1073eba9a!2s5080+Spectrum+Dr+Suite+575E%2C+Addison%2C+TX+75001!5e0!3m2!1sen!2sus!4v1713700000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '1.5rem' }}
                            allowFullScreen=""
                            loading="lazy"
                            className="filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        ></iframe>
                        <div className="absolute top-6 right-6">
                            <a href="https://www.google.com/maps/place/5080+Spectrum+Dr+Suite+575E,+Addison,+TX+75001/@32.9551059,-96.8266452,17.25z/" target="_blank" rel="noopener noreferrer" className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-indigo-600 shadow-lg hover:bg-white transition-all">
                                <FaExternalLinkAlt size={12} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuroraBackground>
    );
};

export default Contact;
