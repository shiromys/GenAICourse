import SupportTicket from '../models/SupportTicket.js';

/**
 * @desc    List support tickets, newest first. Optional ?status=open|closed filter.
 * @route   GET /api/admin/support-tickets
 * @access  Private/Admin
 */
export const getSupportTickets = async (req, res, next) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status === 'open' || status === 'closed') filter.status = status;

        const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
        const openCount = await SupportTicket.countDocuments({ status: 'open' });

        res.status(200).json({
            success: true,
            data: tickets,
            meta: { total: tickets.length, open: openCount }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a ticket's status and/or internal note. Setting status to 'closed' stamps
 *          resolvedAt; reopening a ticket clears it.
 * @route   PUT /api/admin/support-tickets/:id
 * @access  Private/Admin
 */
export const updateSupportTicket = async (req, res, next) => {
    try {
        const { status, adminNotes } = req.body;
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Support ticket not found.' });
        }

        if (status === 'open' || status === 'closed') {
            ticket.status = status;
            ticket.resolvedAt = status === 'closed' ? new Date() : undefined;
        }
        if (typeof adminNotes === 'string') {
            ticket.adminNotes = adminNotes;
        }

        await ticket.save();

        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        next(error);
    }
};
