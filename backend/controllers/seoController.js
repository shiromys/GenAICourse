/**
 * seoController.js — Sitemap Generator for genaicourse.io
 *
 * Generates a fully compliant XML sitemap covering:
 *   - All static pages
 *   - All published courses (dynamic)
 *
 * Route: GET /sitemap.xml — registered in server.js BEFORE the static frontend
 * is served, so this handler always wins over any sitemap.xml file sitting in
 * frontend/public or frontend/dist. There is no other sitemap in this app.
 *
 * NOTE (Oct 13): this previously also listed a /blog index page and six
 * /blog/<slug> article URLs. No Blog page or /blog route exists anywhere in
 * the frontend (confirmed: no Blog.jsx, no /blog route in App.jsx) — those
 * seven URLs were submitting search engines straight into 404s. Removed.
 * If a blog is ever built, its real URLs belong back here.
 */

import { SitemapStream, streamToPromise } from 'sitemap';
import Course from '../models/Course.js';

export const generateSitemap = async (req, res) => {
    try {
        const smStream = new SitemapStream({ hostname: 'https://genaicourse.io' });

        // ── 1. Static public pages ────────────────────────────────────────
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/courses', changefreq: 'daily', priority: 0.9 });
        smStream.write({ url: '/pricing', changefreq: 'monthly', priority: 0.8 });
        smStream.write({ url: '/how-it-works', changefreq: 'monthly', priority: 0.7 });
        smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });

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
