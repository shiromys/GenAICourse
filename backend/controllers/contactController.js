import { sendEmail } from '../services/emailService.js';
import { contactTemplate } from '../utils/email/templates/contactTemplate.js';

/**
 * Handle Contact Form Submission
 */
export const handleContactForm = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        // 1. Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // 2. Set the recipient to your ONLY working inbox
        const recipientEmail = 'info@genaicourse.io';

        console.log(`📡 Sending inquiry from ${name} to ${recipientEmail}`);

        try {
            // 3. Trigger the send
            await sendEmail(
                recipientEmail,                                   // TO: info@
                `📩 New Inquiry: ${subject} from ${name}`,        // Subject
                contactTemplate({ name, email, subject, message }),// Content
                email                                             // REPLY-TO: User's Email
            );

            return res.status(200).json({
                success: true,
                message: "Message sent successfully!"
            });
        } catch (emailError) {
            console.error('❌ Email failed:', emailError.message);
            return res.status(500).json({
                success: false,
                message: 'Failed to send email notification.'
            });
        }
    } catch (error) {
        next(error);
    }
};

export default { handleContactForm };