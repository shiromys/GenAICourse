import BlogPost from '../models/BlogPost.js';

/**
 * Blog Controller
 * Public read access to published blog post cards. Admin CRUD for blog posts lives in
 * adminController.js/adminRoutes.js, matching where course admin CRUD already lives.
 */

/**
 * @desc    Get all published blog posts, newest first
 * @route   GET /api/blog
 * @access  Public
 */
export const getBlogPosts = async (req, res, next) => {
    try {
        const posts = await BlogPost.find({ isPublished: true })
            .select('-createdBy')
            .sort({ publishedDate: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};
