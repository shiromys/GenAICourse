import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaCog, FaCamera, FaSave, FaSignOutAlt, FaBook, FaHistory, FaBell, FaCertificate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import authService from '../services/authService.js';
import { MagneticButton } from '../components/ui/MagneticButton';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.profile?.bio || '',
        title: user?.profile?.title || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatePayload = {
                name: profileData.name,
                email: profileData.email,
                profile: {
                    bio: profileData.bio,
                    title: profileData.title
                }
            };
            const res = await authService.updateProfile(updatePayload);
            if (res.success) {
                updateUser(res.data);
                toast.success('Student profile synced!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error('New passwords do not match');
        }
        try {
            setIsLoading(true);
            await authService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success('Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Basic Profile', icon: <FaUser /> },
        { id: 'security', label: 'Security', icon: <FaLock /> },
        { id: 'courses', label: 'My Learning', icon: <FaBook /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 selection:bg-red-50 selection:text-red-600">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="glass-card bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden sticky top-32">
                            {/* Avatar Section */}
                            <div className="p-8 text-center bg-gradient-to-b from-red-50/50 to-white border-b border-gray-50">
                                <div className="relative inline-block group mb-4">
                                    <div className="w-32 h-32 rounded-3xl bg-red-100 flex items-center justify-center text-red-600 text-4xl font-black border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                        {user?.name?.[0].toUpperCase()}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-white hover:bg-red-700 transition-all">
                                        <FaCamera size={14} />
                                    </button>
                                </div>
                                <h2 className="text-xl font-black text-slate-900 mb-1">{user?.name}</h2>
                                <p className="text-sm font-bold text-red-600 uppercase tracking-widest">{user?.role || 'Student'}</p>
                            </div>

                            {/* Navigation List */}
                            <div className="p-4 space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-red-50 text-red-600 shadow-sm'
                                            : 'text-slate-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className={activeTab === tab.id ? 'text-red-500' : 'text-slate-400'}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                    </button>
                                ))}

                                <div className="h-px bg-gray-100 my-4 mx-4"></div>

                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <FaSignOutAlt />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 lg:p-12 min-h-[600px]"
                            >
                                {activeTab === 'profile' && (
                                    <div>
                                        <div className="mb-10">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">Edit genaicourse Profile</h3>
                                            <p className="text-slate-500 font-medium font-sans">Update your personal information and biography.</p>
                                        </div>

                                        <form onSubmit={handleProfileUpdate} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Full Identity</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.name}
                                                        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner"
                                                        placeholder="Your Full Name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Work Title</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.title}
                                                        onChange={e => setProfileData({ ...profileData, title: e.target.value })}
                                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner"
                                                        placeholder="e.g. AI Researcher"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Bio Protocol</label>
                                                <textarea
                                                    rows="4"
                                                    value={profileData.bio}
                                                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner resize-none"
                                                    placeholder="Tell us about yourself..."
                                                ></textarea>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="btn-premium btn-primary group !rounded-2xl !py-5 !px-10"
                                                >
                                                    {isLoading ? 'Syncing...' : (
                                                        <>
                                                            <FaSave className="mr-2 group-hover:rotate-12 transition-transform" />
                                                            Commit Changes
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div>
                                        <div className="mb-10">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">Security Vault</h3>
                                            <p className="text-slate-500 font-medium font-sans">Update your password to keep your account secure.</p>
                                        </div>

                                        <form onSubmit={handlePasswordChange} className="space-y-8 max-w-xl">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Current Password</label>
                                                <input
                                                    type="password"
                                                    required
                                                    value={passwordData.currentPassword}
                                                    onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">New genaicourse Key</label>
                                                <input
                                                    type="password"
                                                    required
                                                    value={passwordData.newPassword}
                                                    onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest ml-1">Confirm New Key</label>
                                                <input
                                                    type="password"
                                                    required
                                                    value={passwordData.confirmPassword}
                                                    onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all shadow-inner"
                                                />
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="btn-premium btn-primary group !rounded-2xl !py-5 !px-10"
                                                >
                                                    {isLoading ? 'Encrypting...' : 'Update Keychain'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === 'courses' && (
                                    <div>
                                        <div className="mb-10">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">Module Archive</h3>
                                            <p className="text-slate-500 font-medium font-sans">Tracking your active enrollments and progress.</p>
                                        </div>

                                        <div className="space-y-6">
                                            {user?.enrolledCourses?.length > 0 ? (
                                                user.enrolledCourses.map((enrollment, idx) => (
                                                    <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                                                        <div className="w-full md:w-32 h-20 rounded-2xl bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-500">
                                                            <FaBook size={32} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-black text-lg text-slate-900 mb-1">{enrollment.courseId?.title || 'Unknown Course'}</h4>
                                                            <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                                                <span className="flex items-center gap-1"><FaHistory className="text-red-500" /> Joined {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                                                                <span className="flex items-center gap-1"><FaCertificate className="text-red-500" /> {enrollment.progress}% Finished</span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                <div className="h-full bg-red-600 rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                                                    <p className="text-gray-400 font-bold italic">No active genaicourse connections found.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div className="text-center py-20">
                                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                                            <FaBell size={32} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">Notification Hub</h3>
                                        <p className="text-slate-500 font-bold max-w-sm mx-auto">Settings for genaicourse pings and marketing communications will appear here soon.</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
