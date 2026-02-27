import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Resend Email Service
 * 
 * Handles email delivery using Resend API.
 */

// We initialize inside the function to ensure process.env is ready
export const sendEmail = async (to, subject, html, attachments = []) => {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

        if (!apiKey) {
            console.error('❌ RESEND_API_KEY is missing in environmental variables.');
            throw new Error('Email service configuration missing');
        }

        const resend = new Resend(apiKey);

        const emailOptions = {
            from: fromEmail,
            to: to,
            subject: subject,
            html: html,
        };

        if (attachments && attachments.length > 0) {
            emailOptions.attachments = attachments;
        }

        console.log(`📡 Sending email to ${to} using FROM: ${fromEmail}`);

        const result = await resend.emails.send(emailOptions);

        if (!result || result.error) {
            const errorDetails = result?.error ? JSON.stringify(result.error, null, 2) : 'Unknown Resend Error';
            console.error('❌ Resend API Error:', errorDetails);
            throw new Error(result?.error?.message || 'Failed to send email via Resend');
        }

        console.log(`✅ Email sent successfully to ${to}. ID: ${result.data?.id}`);
        return result.data;

    } catch (error) {
        if (error.message.includes('testing emails to your own email address')) {
            console.error('\n⚠️  RESEND LIMITATION ALERT ⚠️');
            console.error('You are currently in testing mode. You can ONLY send emails to your verified Resend email.');
            console.error('To send emails to students (Gmail, etc.), you MUST:');
            console.error('1. Go to https://resend.com/domains');
            console.error('2. Add and verify your domain (e.g., genaicourse.io)');
            console.error('3. Update EMAIL_FROM in your .env to an email using that domain.\n');
        } else {
            console.error(`❌ Error in sendEmail to ${to}:`, error.message);
        }
        throw error;
    }
};

export const sendEmailWithRetry = async (emailFn, args, retries = 3) => {
    try {
        return await emailFn(...args);
    } catch (error) {
        if (retries > 0) {
            console.warn(`⚠️ Retrying email... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Increased delay for retry
            return sendEmailWithRetry(emailFn, args, retries - 1);
        } else {
            console.error(`❌ Email failed after all retries to ${args[0]}`);
            throw error;
        }
    }
};

export default {
    sendEmail,
    sendEmailWithRetry
};
