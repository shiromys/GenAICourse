import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUserShield, FaChevronRight } from 'react-icons/fa';
import { MagneticButton } from '../ui/MagneticButton';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 top-0 ${scrolled
                ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-lg'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center text-[var(--brand)]">
                <Link to="/" className="flex items-center group">
                    <img src="/logo.png" alt="GenAI" className="h-[60px] w-auto object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Liquid Glass Pill Navbar */}
                    <div className="flex items-center gap-6 bg-white/95 px-8 py-3 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-2xl">
                        <NavLink to="/" active={isActive('/')}>Home</NavLink>
                        <NavLink to="/courses" active={isActive('/courses')}>Courses</NavLink>
                        <NavLink to="/pricing" active={isActive('/pricing')}>Pricing</NavLink>
                        <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
                    </div>

                    {isAuthenticated ? (
                        <div className="relative ml-2">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="w-[42px] h-[42px] rounded-full bg-[#0F172A] text-white font-black text-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                                data-testid="user-menu"
                            >
                                {user?.name?.[0]?.toUpperCase()}
                            </button>

                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute right-0 top-[60px] w-56 bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 py-4 overflow-hidden z-50 origin-top-right backdrop-blur-xl"
                                    >
                                        <div className="px-2 space-y-1">
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="block px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
                                            >
                                                My Dashboard
                                            </Link>
                                            <Link
                                                to="/profile"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="block px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
                                            >
                                                My Profile
                                            </Link>
                                            {user?.role === 'admin' && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="block px-4 py-2.5 text-[13px] font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                >
                                                    Admin Console
                                                </Link>
                                            )}
                                            <div className="my-2 border-t border-slate-50"></div>
                                            <button
                                                onClick={() => { logout(); setUserMenuOpen(false); toast.success('Logout successful'); }}
                                                className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-[var(--brand)] transition-colors" data-testid="login-link">
                                Sign In
                            </Link>
                            <MagneticButton>
                                <Link to="/register" className="btn-premium btn-primary !py-3.5 !px-8 text-xs font-black shadow-xl" data-testid="register-link">
                                    Get Started
                                    <FaChevronRight className="text-[10px]" />
                                </Link>
                            </MagneticButton>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden w-11 h-11 bg-white rounded-2xl flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors text-brand"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-8 shadow-2xl z-40"
                    >
                        <div className="flex flex-col gap-6">
                            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                            <MobileNavLink to="/courses" onClick={() => setIsOpen(false)}>Courses</MobileNavLink>
                            <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>Pricing</MobileNavLink>
                            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
                            <div className="h-px bg-gray-200"></div>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-brand">My Learning</Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-accent">Admin Area</Link>
                                    )}
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="text-left text-red-500 font-bold"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg text-brand">Sign In</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="btn-premium btn-primary text-center justify-center">Get Started Free</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

const NavLink = ({ to, children, active }) => {
    const handleClick = () => {
        if (active) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={`text-[13px] font-extrabold transition-all relative px-3 py-1.5 rounded-lg ${active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'}`}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[6px] left-[10%] right-[10%] h-[3px] bg-orange-600 rounded-t-full"
                />
            )}
        </Link>
    );
};

const MobileNavLink = ({ to, children, onClick }) => (
    <Link to={to} onClick={onClick} className="text-2xl font-black text-brand hover:text-accent transition-colors uppercase tracking-tight">
        {children}
    </Link>
);

export default Navbar;
