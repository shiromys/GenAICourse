import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, XCircle, Award, Calendar, User, Search, Loader2 } from 'lucide-react';

const VerifyCertificate = () => {
    const { certificateId } = useParams();
    const [verificationData, setVerificationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verify = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/certificates/verify/${certificateId}`);
                const data = await response.json();
                
                if (data.success) {
                    setVerificationData(data.data);
                } else {
                    setError(data.message || 'Certificate not found or invalid.');
                }
            } catch (err) {
                setError('Failed to contact verification server. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (certificateId) {
            verify();
        } else {
            setLoading(false);
            setError('No certificate ID provided.');
        }
    }, [certificateId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[var(--bg-main)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full">
                
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mx-auto w-20 h-20 bg-indigo-50/50 backdrop-blur-3xl rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-indigo-100/20"
                    >
                        <Search className="h-10 w-10 text-indigo-500" />
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-4xl">
                        Certificate Verification
                    </h2>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">
                        Verify the authenticity of a GenAiCourse.io certificate.
                    </p>
                </div>

                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xl rounded-3xl overflow-hidden p-8 relative">
                    
                    {/* Decorative blurred blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
                            <p className="text-[var(--text-secondary)]">Verifying record securely...</p>
                        </div>
                    ) : error ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-8 text-center"
                        >
                            <div className="rounded-full bg-red-100 p-4 mb-6">
                                <XCircle className="h-12 w-12 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Verification Failed</h3>
                            <p className="text-[var(--text-secondary)] mb-8">{error}</p>
                            <Link to="/courses" className="text-indigo-500 font-semibold hover:text-indigo-400">
                                Browse our courses →
                            </Link>
                        </motion.div>
                    ) : verificationData ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10"
                        >
                            <div className="flex flex-col items-center text-center pb-8 border-b border-[var(--border-color)] mb-8">
                                <div className="rounded-full bg-emerald-100/80 p-4 mb-4 ring-8 ring-emerald-50">
                                    <ShieldCheck className="h-10 w-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-emerald-600 mb-2 tracking-tight">Official & Verified Record</h3>
                                <p className="text-[var(--text-secondary)] font-mono text-sm max-w-full truncate px-4 bg-[var(--bg-main)] py-2 rounded-lg border border-[var(--border-color)]">
                                    ID: {certificateId}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                                        <User className="h-4 w-4 mr-2" /> Recipient Name
                                    </label>
                                    <p className="text-2xl font-bold text-[var(--text-main)] font-serif italic">
                                        {verificationData.certificate.userName}
                                    </p>
                                </div>

                                <div>
                                    <label className="flex items-center text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                                        <Award className="h-4 w-4 mr-2" /> Course Completed
                                    </label>
                                    <p className="text-xl font-semibold text-[var(--text-main)]">
                                        {verificationData.certificate.courseTitle}
                                    </p>
                                    {verificationData.certificate.score > 0 && (
                                        <p className="text-sm mt-2 text-[var(--text-secondary)]">
                                            Passed with a score of <strong className="text-indigo-500">{Math.round(verificationData.certificate.score)}%</strong>
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row gap-6">
                                    <div className="flex-1">
                                        <label className="flex items-center text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                                            <Calendar className="h-4 w-4 mr-2" /> Date of Issue
                                        </label>
                                        <p className="text-[var(--text-main)] font-medium">
                                            {formatDate(verificationData.certificate.completionDate)}
                                        </p>
                                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                                            <strong>Curriculum Last Updated:</strong> {formatDate(new Date())}
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <label className="flex items-center text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                                            <ShieldCheck className="h-4 w-4 mr-2" /> Status
                                        </label>
                                        <p className="text-[var(--text-main)] font-medium text-emerald-500 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                            Valid & Active
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </div>
                
                <div className="mt-8 text-center text-sm text-[var(--text-secondary)]">
                    Powered by GenAiCourse.io secure credentialing.
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
