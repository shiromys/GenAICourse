/**
 * Login Alert Email Template
 * 
 * Security notification for new sign-ins.
 * 
 * @param {string} name - User's name
 * @returns {string} HTML content
 */
export const loginAlertTemplate = (name) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #fce7f3; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; border-top: 6px solid #be185d; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #be185d; font-size: 24px; margin: 0;">🔐 Security Alert</h2>
      <p style="color: #64748b; font-size: 14px; margin-top: 5px;">New Sign-in Detected</p>
    </div>

    <div style="padding: 20px; background-color: #fff1f2; border-radius: 8px; border: 1px solid #fda4af;">
      <p style="color: #881337; font-size: 16px; margin: 0;"><strong>Hello ${name},</strong></p>
      <p style="color: #9f1239; font-size: 15px; margin-top: 10px;">
        Your account was accessed successfully just now.
      </p>
    </div>

    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-top: 20px;">
      If this was you, you can safely ignore this email.
    </p>

    <p style="color: #be185d; font-weight: 600; font-size: 16px; margin-top: 20px;">
      Wasn't you?
    </p>
    <p style="color: #475569; font-size: 15px;">
      If you did not sign in, your account may be compromised. Please reset your password immediately to secure your account.
    </p>

    <div style="text-align: center; margin-top: 30px;">
      <a href="${process.env.FRONTEND_URL}/forgot-password" style="background-color: #be185d; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
        Secure My Account
      </a>
    </div>

    <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px;">
        This is an automated security notification from GENAICOURSE.IO.
      </p>
    </div>
  </div>
</body>
</html>
`;

export default loginAlertTemplate;
