import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Resend Email Service
 * 
 * Handles email delivery using Resend API.
 * Replaces legacy Nodemailer SMTP configuration.
 */

// Initialize Resend Client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email via Resend API
 * 
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 * @param {Array} attachments - Optional attachments [{ filename, content }]
 * @returns {Promise<Object>} - Resend API response
 */
export const sendEmail = async (to, subject, html, attachments = []) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('⚠️ RESEND_API_KEY is missing. Email skipped.');
            return { id: 'mock-id', success: true, skipped: true };
        }

        const emailData = {
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        };

        const { data, error } = await resend.emails.send(emailData);

        if (error) {
            console.error('❌ Resend API Error:', error);
            throw new Error(error.message);
        }

        console.log(`✅ Email sent via Resend: ${data.id}`);
        return data;

    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error.message);
        // Throw error to trigger retry logic if used
        throw error;
    }
};

/**
 * Retry wrapper for robust email delivery
 * 
 * @param {Function} emailFn - Function to execute (sendEmail)
 * @param {Array} args - Arguments for the function
 * @param {number} retries - Number of retries
 * @returns {Promise<Object>}
 */
export const sendEmailWithRetry = async (emailFn, args, retries = 3) => {
    try {
        return await emailFn(...args);
    } catch (error) {
        if (retries > 0) {
            console.warn(`⚠️ Retrying email... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return sendEmailWithRetry(emailFn, args, retries - 1);
        } else {
            throw error;
        }
    }
};

export default {
    sendEmail,
    sendEmailWithRetry
};
