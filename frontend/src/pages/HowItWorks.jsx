import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookReader, FaLaptopCode, FaCertificate, FaArrowRight } from 'react-icons/fa';
import SEOHelmet from '../components/common/SEOHelmet';

// ── HowTo JSON-LD (helps Google show rich results for step-by-step processes) ──
const HOW_IT_WORKS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Earn an AI Certification Online with GenAI Course',
    description:
        'Learn how to get your AI certification online in 3 easy steps. Choose your generative AI course, learn interactively, and earn a verifiable certificate.',
    url: 'https://genaicourse.io/how-it-works',
    totalTime: 'PT4H',
    supply: [
        { '@type': 'HowToSupply', name: 'A computer or mobile device' },
        { '@type': 'HowToSupply', name: 'Internet connection' },
    ],
    step: [
        {
            '@type': 'HowToStep',
            name: '1. Choose Your AI Course Path',
            text: 'Browse our generative AI course catalog and choose the course that matches your skill level and career goals.',
            url: 'https://genaicourse.io/courses',
        },
        {
            '@type': 'HowToStep',
            name: '2. Learn Interactively',
            text: 'Study at your own pace with our slide-based lessons, code snippets, and real-world AI exercises.',
        },
        {
            '@type': 'HowToStep',
            name: '3. Get AI Certified',
            text: 'Pass the final assessment to earn your verifiable AI certificate — shareable on LinkedIn and job applications.',
        },
    ],
};

const HowItWorks = () => {
    return (
        <div className="section section-pt bg-[var(--bg-main)]">

            {/* ── SEO META ────────────────────────────────────────────────── */}
            <SEOHelmet
                title="How It Works | Learn AI Online Step by Step"
                description="Learn how GenAI Course works. Choose your AI course, study interactively, pass the assessment, and earn a verifiable AI certification. Simple, flexible, and 100% online."
                canonical="/how-it-works"
                schema={HOW_IT_WORKS_SCHEMA}
                breadcrumb={[
                    { name: 'Home', url: '/' },
                    { name: 'How It Works', url: '/how-it-works' },
                ]}
            />

            <div className="container max-w-4xl mx-auto">

                {/* H1 — keyword: "learn AI online" */}
                <h1 className="section-title text-brand">
                    How to Learn AI Online and Get Certified
                </h1>

                {/* H2 — supporting keyword */}
                <p className="text-xl text-center text-gray-500 mb-16 max-w-2xl mx-auto">
                    Our platform is designed to make learning generative AI simple, interactive, and
                    effective — for beginners and professionals alike.
                </p>

                <div className="space-y-12">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <FaBookReader size={32} aria-hidden="true" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            {/* H3 — supporting keyword: "AI courses online" */}
                            <h3 className="text-2xl font-bold mb-3 text-brand">
                                1. Choose Your AI Course Path
                            </h3>
                            <p className="text-gray-500">
                                Browse our catalog of generative AI courses online. Whether you're a complete
                                beginner or an experienced developer, we have a structured learning path for
                                every level. Filter by topic, difficulty, or career goal.
                            </p>
                        </div>
                        <div className="hidden md:block text-gray-400">
                            <FaArrowRight size={24} aria-hidden="true" />
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                            <FaLaptopCode size={32} aria-hidden="true" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-3 text-brand">
                                2. Learn Interactively at Your Own Pace
                            </h3>
                            <p className="text-gray-500">
                                Our slide-based learning system breaks down complex AI concepts into
                                digestible modules. Study when it suits you — read lessons, explore code
                                snippets, and track your progress in real-time. No live sessions, no deadlines.
                            </p>
                        </div>
                        <div className="hidden md:block text-gray-400">
                            <FaArrowRight size={24} aria-hidden="true" />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <FaCertificate size={32} aria-hidden="true" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            {/* H3 — keyword: "AI certification course" */}
                            <h3 className="text-2xl font-bold mb-3 text-brand">
                                3. Earn Your Verifiable AI Certificate
                            </h3>
                            <p className="text-gray-500">
                                Pass the final assessment to earn your AI certification. Each certificate is
                                publicly verifiable — share it on LinkedIn, add it to your CV, and prove your
                                AI skills to employers. Our AI certification course is recognised by hiring
                                managers across industries.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Internal Links CTA */}
                <div className="mt-20 bg-indigo-50 border border-indigo-100 rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-black text-brand mb-4">
                        Ready to Start Your AI Certification Journey?
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                        Explore our generative AI courses online, check transparent{' '}
                        <Link to="/pricing" className="text-indigo-600 font-semibold hover:underline">pricing</Link>,
                        or{' '}
                        <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                            create a free account
                        </Link>{' '}
                        to get started today.
                    </p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-lg px-10 py-4 rounded-2xl hover:bg-indigo-600 transition-all"
                        aria-label="Browse all AI courses online"
                    >
                        Browse AI Courses <FaArrowRight className="text-sm opacity-80" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
