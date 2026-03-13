import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with your API Key from environment variables
// Ensure RESEND_API_KEY is defined in your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Core Email Sender
 * * @param {string} to - The recipient email (e.g., info@genaicourse.io)
 * @param {string} subject - The subject line of the email
 * @param {string} html - The HTML content/template for the email
 * @param {string} replyTo - (Optional) The email address to use when clicking 'Reply'
 * @returns {Promise} - Returns the Resend response object
 */
export const sendEmail = async (to, subject, html, replyTo = null) => {
    try {
        const payload = {
            // CRITICAL: This 'from' address MUST be from your verified domain in Resend.
            // Do not use the user's email here; otherwise, Resend will block the request.
            from: 'GenAICourse <info@genaicourse.io>',
            to: to,
            subject: subject,
            html: html,
        };

        // If a replyTo is provided (the user's email), we attach it here.
        // This solves the issue of being unable to reply directly to the customer.
        if (replyTo) {
            payload.reply_to = replyTo;
        }

        const { data, error } = await resend.emails.send(payload);

        if (error) {
            console.error('Resend API Error:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Email Service Internal Error:', error.message);
        throw error;
    }
};