import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaHouse } from 'react-icons/fa6';
import SEOHelmet from '../components/common/SEOHelmet';

// Catch-all page for any route that doesn't match one of the app's defined
// routes. Previously there was no path="*" route at all, so an unmatched URL
// just rendered Navbar + Footer with a completely blank middle — no
// messaging, no way back. noIndex is set since this page itself should never
// be the thing a search engine indexes.
const NotFound = () => {
    return (
        <div className="section pt-8 min-h-[70vh] bg-[#FDFCFB] flex items-center">
            <SEOHelmet
                title="Page Not Found"
                description="The page you're looking for doesn't exist or may have moved."
                noIndex={true}
            />
            <div className="container py-16 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">
                    404
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Page not found
                </h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
                    The page you're looking for doesn't exist, may have moved, or the link might be out of date.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95 w-full sm:w-auto"
                    >
                        <FaHouse size={12} /> Back to Home
                    </Link>
                    <Link
                        to="/courses"
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-sm hover:border-blue-300 hover:text-blue-600 transition-all w-full sm:w-auto"
                    >
                        <FaCompass size={12} /> Browse Courses
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
