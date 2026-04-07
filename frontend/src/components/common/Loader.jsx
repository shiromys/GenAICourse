import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full theme-beige bg-[var(--bg-main)]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full"
            />
        </div>
    );
};

export default Loader;
