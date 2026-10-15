import mongoose from 'mongoose';

/**
 * A blog post card shown on the public /blog page. The post itself is written and hosted
 * externally (Blogger), so this model is deliberately just a pointer + the card metadata —
 * not the post content. postUrl is the only required link out; everything else is display.
 *
 * isPublished mirrors Course.isPublished: a draft card is visible to admins in the console
 * but never served from GET /api/blog, so a post can be queued up before it's live without
 * a learner ever seeing a half-finished card.
 */
const blogPostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 200 },
        excerpt: { type: String, trim: true, maxlength: 400, default: '' },
        postUrl: { type: String, required: true, trim: true },
        imageUrl: { type: String, trim: true, default: '' },
        publishedDate: { type: Date, default: Date.now },
        isPublished: { type: Boolean, default: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

// Public listing sorts newest-first by publishedDate — index it so that stays cheap as the
// list grows.
blogPostSchema.index({ isPublished: 1, publishedDate: -1 });

export default mongoose.model('BlogPost', blogPostSchema);
