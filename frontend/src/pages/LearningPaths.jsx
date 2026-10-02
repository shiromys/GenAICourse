import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import learningPathService from '../services/learningPathService.js';
import Loader from '../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRoute, FaPlus, FaXmark, FaArrowRight, FaCircleCheck } from 'react-icons/fa6';
import SEOHelmet from '../components/common/SEOHelmet';

// These mirror the LearningPath model's own enums — picking anything outside
// this list fails validation server-side, so the form can't offer it.
const CATEGORIES = ['AI/ML', 'Web Development', 'Data Science', 'Cloud Computing', 'Other'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const TIME_COMMITMENTS = [
    { value: 'low', label: 'Light — a few hours a week' },
    { value: 'medium', label: 'Steady — ~10 hrs/week' },
    { value: 'high', label: 'Intensive — ~20 hrs/week' },
];

const LearningPaths = () => {
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [generating, setGenerating] = useState(false);

    const [goal, setGoal] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
    const [timeCommitment, setTimeCommitment] = useState('medium');
    const [currentSkills, setCurrentSkills] = useState('');

    const fetchPaths = useCallback(async () => {
        setLoading(true);
        try {
            const result = await learningPathService.getAll();
            setPaths(result.data?.learningPaths || []);
        } catch (error) {
            toast.error('Could not load your learning paths');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPaths();
    }, [fetchPaths]);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!goal.trim()) {
            toast.warn('Tell us what you want to achieve first.');
            return;
        }
        setGenerating(true);
        try {
            const skills = currentSkills
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            const result = await learningPathService.generate({
                goal: goal.trim(),
                category,
                difficulty,
                timeCommitment,
                currentSkills: skills,
            });
            toast.success('Your personalized path is ready!');
            setShowForm(false);
            setGoal('');
            setCurrentSkills('');
            setPaths((prev) => [result.data, ...prev]);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Could not generate a path right now');
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="section pt-8 min-h-screen bg-[#FDFCFB]">
            <SEOHelmet
                title="My Learning Paths"
                description="Build a personalized, step-by-step learning path across our AI courses."
                canonical="/learning-paths"
                noIndex={true}
            />
            <div className="container py-8 md:py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Personalized</p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Your Learning Paths</h1>
                        <p className="text-slate-500 font-medium mt-3 max-w-xl">
                            Tell us your goal and we'll line up the right courses, in the right order, from what's already in our catalogue.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                    >
                        <FaPlus size={12} /> Create a Path
                    </button>
                </div>

                {paths.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {paths.map((path, idx) => (
                            <motion.div
                                key={path._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.07 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {path.category}
                                    </span>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {path.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{path.title}</h3>
                                <p className="text-slate-400 font-medium text-sm mb-6 line-clamp-2">{path.description}</p>

                                <div className="flex items-center justify-between mb-2 text-sm">
                                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Progress</span>
                                    <span className="font-black text-blue-600">{Math.round(path.progress || 0)}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                                        style={{ width: `${path.progress || 0}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-6">
                                    <span>{path.courses?.length || 0} courses</span>
                                    {path.isCompleted && (
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <FaCircleCheck /> Completed
                                        </span>
                                    )}
                                </div>

                                <Link
                                    to={`/learning-paths/${path._id}`}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-blue-600 transition-all active:scale-[0.98]"
                                >
                                    View Path <FaArrowRight size={12} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaRoute size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">No learning paths yet</h3>
                        <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
                            Tell us what you're trying to learn and we'll put together a course order to get you there.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                        >
                            Create Your First Path
                        </button>
                    </div>
                )}
            </div>

            {/* Create Path modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/55 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => !generating && setShowForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.97 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => !generating && setShowForm(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
                                aria-label="Close"
                            >
                                <FaXmark size={18} />
                            </button>
                            <h2 className="text-2xl font-black text-slate-900 mb-1">Create a Learning Path</h2>
                            <p className="text-slate-400 font-medium text-sm mb-6">
                                We'll match courses from our catalogue to your goal and current level.
                            </p>

                            <form onSubmit={handleGenerate} className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 block mb-1.5">What's your goal?</label>
                                    <input
                                        type="text"
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        placeholder="e.g. Become a machine learning engineer"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 block mb-1.5">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 block mb-1.5">Starting level</label>
                                        <select
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700 block mb-1.5">Time you can commit</label>
                                    <select
                                        value={timeCommitment}
                                        onChange={(e) => setTimeCommitment(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    >
                                        {TIME_COMMITMENTS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700 block mb-1.5">
                                        Skills you already have <span className="text-slate-400 font-medium">(optional, comma-separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={currentSkills}
                                        onChange={(e) => setCurrentSkills(e.target.value)}
                                        placeholder="e.g. Python, prompt engineering"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={generating}
                                    className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black transition-all active:scale-[0.98] disabled:opacity-60"
                                >
                                    {generating ? 'Building your path...' : 'Generate My Path'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LearningPaths;
