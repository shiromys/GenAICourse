import mongoose from 'mongoose';

/**
 * A support ticket, created automatically whenever someone submits the public contact form
 * (see contactController.handleContactForm). Keeping a DB record in addition to the existing
 * "fire an email to info@genaicourse.io" behavior means a query never gets lost in an inbox,
 * and admins have a place to track it through to resolution.
 *
 * source is 'contact-form' for anything that came through the public form, and 'manual' for
 * a ticket an admin opens directly (e.g. logging a query that arrived by direct email instead
 * of the form) so the whole "direct email" inflow can live in the same place too.
 */
const supportTicketSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        subject: { type: String, required: true, trim: true },
        message: { type: String, required: true, trim: true },
        status: { type: String, enum: ['open', 'closed'], default: 'open', index: true },
        source: { type: String, enum: ['contact-form', 'manual'], default: 'contact-form' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        adminNotes: { type: String, trim: true, default: '' },
        resolvedAt: { type: Date }
    },
    { timestamps: true }
);

export default mongoose.model('SupportTicket', supportTicketSchema);
