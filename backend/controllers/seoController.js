/**
 * seoController.js — Sitemap Generator for genaicourse.io
 *
 * Generates a fully compliant XML sitemap covering:
 *   - All static pages
 *   - All published courses (dynamic)
 *   - All blog articles (static)
 *
 * Route: GET /sitemap.xml
 */

import { SitemapStream, streamToPromise } from 'sitemap';
import Course from '../models/Course.js';

// ── Blog slugs (keep in sync with frontend/src/pages/Blog.jsx BLOG_POSTS) ──
const BLOG_SLUGS = [
    'best-generative-ai-course-for-beginners-2026',
    'ai-course-for-non-programmers',
    'ai-course-with-certificate-usa',
    'ai-certification-cost-worth-it',
    'job-ready-ai-course-what-to-learn',
    'learn-ai-online-complete-guide',
];

export const generateSitemap = async (req, res) => {
    try {
        const smStream = new SitemapStream({ hostname: 'https://genaicourse.io' });

        // ── 1. Static public pages ────────────────────────────────────────
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/courses', changefreq: 'daily', priority: 0.9 });
        smStream.write({ url: '/pricing', changefreq: 'monthly', priority: 0.8 });
        smStream.write({ url: '/how-it-works', changefreq: 'monthly', priority: 0.7 });
        smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });
        smStream.write({ url: '/blog', changefreq: 'weekly', priority: 0.8 });

        // ── 2. Legal pages ────────────────────────────────────────────────
        smStream.write({ url: '/privacy', changefreq: 'yearly', priority: 0.3 });
        smStream.write({ url: '/terms', changefreq: 'yearly', priority: 0.3 });
        smStream.write({ url: '/refund', changefreq: 'yearly', priority: 0.3 });

        // ── 3. Dynamic course pages ───────────────────────────────────────
        const courses = await Course.find({ isPublished: true })
            .select('slug updatedAt _id')
            .lean();

        courses.forEach(course => {
            const identifier = course.slug || course._id;
            smStream.write({
                url: `/courses/${identifier}`,
                lastmod: course.updatedAt
                    ? new Date(course.updatedAt).toISOString()
                    : new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.85,
            });
        });

        // ── 4. Blog articles ──────────────────────────────────────────────
        BLOG_SLUGS.forEach(slug => {
            smStream.write({
                url: `/blog/${slug}`,
                changefreq: 'monthly',
                priority: 0.75,
            });
        });

        smStream.end();
        const sitemapOutput = await streamToPromise(smStream);

        res.header('Content-Type', 'application/xml');
        res.header('Cache-Control', 'public, max-age=3600'); // cache 1 hour
        res.send(sitemapOutput);

    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Sitemap generation failed');
    }
};
