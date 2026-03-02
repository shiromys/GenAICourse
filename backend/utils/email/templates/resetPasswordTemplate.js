/**
 * Password Reset Email Template
 * 
 * Provides a secure link to reset the user's password.
 * 
 * @param {string} name - User's full name
 * @param {string} resetUrl - Unique reset URL
 * @returns {string} HTML content
 */
export const resetPasswordTemplate = (name, resetUrl) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; border-top: 6px solid #4f46e5; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #4f46e5; font-size: 24px; margin: 0;">Password Reset Request</h2>
      <p style="color: #64748b; font-size: 16px; margin-top: 5px;">Secure Account Access</p>
    </div>

    <div style="margin-bottom: 30px;">
      <p style="color: #1e293b; font-size: 18px; font-weight: 600;">Hello ${name},</p>
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        We received a request to reset your password for your <strong style="color: #4f46e5;">GENAICOURSE.IO</strong> account.
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 4px 6px rgba(79, 70, 229, 0.4);">
        Reset Password
      </a>
    </div>

    <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; border: 1px solid #c7d2fe; text-align: center;">
      <p style="color: #312e81; font-size: 14px; font-weight: 600; margin: 0;">
        ⚠️ Security Notice
      </p>
      <p style="color: #4338ca; font-size: 13px; margin: 5px 0 0 0;">
        This link is valid for <strong>15 minutes</strong> only. If you did not request a password reset, you can safely ignore this email.
      </p>
    </div>

    

    <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px;">
        © ${new Date().getFullYear()} GENAICOURSE.IO. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

export default resetPasswordTemplate;
