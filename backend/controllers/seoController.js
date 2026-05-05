import { SitemapStream, streamToPromise } from 'sitemap';
import Course from '../models/Course.js';

export const generateSitemap = async (req, res) => {
    try {
        const smStream = new SitemapStream({ hostname: 'https://genaicourse.io' });

        // 1. Static Pages
        smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        smStream.write({ url: '/courses', changefreq: 'daily', priority: 0.9 });
        smStream.write({ url: '/pricing', changefreq: 'monthly', priority: 0.7 });

        // 2. Dynamic Course Pages (Using Slugs with _id Fallback)
        // Ensure _id is selected to avoid "undefined" if slug is missing
        const courses = await Course.find({ isPublished: true }).select('slug updatedAt _id');

        courses.forEach(course => {
            // Check for slug, fallback to _id to prevent broken "undefined" links
            const identifier = course.slug || course._id;

            smStream.write({
                url: `/courses/${identifier}`,
                lastmod: course.updatedAt,
                changefreq: 'weekly',
                priority: 0.8
            });
        });

        smStream.end();
        const sitemapOutput = await streamToPromise(smStream);

        res.header('Content-Type', 'application/xml');
        res.send(sitemapOutput);
    } catch (error) {
        console.error('Sitemap Error:', error);
        res.status(500).send('Sitemap generation failed');
    }
};