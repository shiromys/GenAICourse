import React from 'react';

/**
 * Full-page maintenance notice, shown by App.jsx when GET /api/settings/status
 * reports maintenanceMode: true, for anyone who isn't a logged-in admin.
 * Admins and the /login and /admin routes bypass this so the toggle can be
 * switched back off from the admin console at any time.
 */
const MaintenancePage = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white px-6">
        <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,.4)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-3">We'll be right back</h1>
            <p className="text-slate-400 font-medium leading-relaxed">
                {message || "We're doing some scheduled maintenance right now. Please check back shortly."}
            </p>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-8">GenAICourse.IO</p>
        </div>
    </div>
);

export default MaintenancePage;
