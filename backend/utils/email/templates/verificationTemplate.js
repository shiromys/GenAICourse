/**
 * Email Verification Template
 * 
 * Used for verifying user's email address.
 * 
 * @param {string} name - User's name
 * @param {string} url - Verification URL
 * @returns {string} HTML content
 */
export const verificationTemplate = (name, url) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://genaicourse.io/logo-large.png" onerror="this.src='https://placehold.co/400x100/4f46e5/ffffff?text=GenAICourse.io'" alt="GenAI Logo" style="height: 50px; width: auto;">
      <p style="color: #64748b; font-size: 16px; margin-top: 10px;">Transform Your Career with AI</p>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 10px;">Verify Your Email Address</h2>
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        Hello ${name}, thank you for joining GENAICOURSE.IO! To complete your registration and start learning, please verify your email address by clicking the button below.
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s;">
        Verify Email Now
      </a>
    </div>

    <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 30px;">
      Or copy and paste this link in your browser: <br>
      <span style="color: #2563eb; word-break: break-all;">${url}</span>
    </p>

    <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
      <p style="color: #64748b; font-size: 13px; text-align: center;">
        If you didn't create an account, you can safely ignore this email.
      </p>
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 10px;">
        © ${new Date().getFullYear()} GENAICOURSE.IO. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

export default verificationTemplate;
