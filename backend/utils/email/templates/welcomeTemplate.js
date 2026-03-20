/**
 * Welcome Email Template
 * 
 * Used for onboarding new users.
 * 
 * @param {string} name - User's name
 * @returns {string} HTML content
 */
export const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${process.env.FRONTEND_URL}/logo.png" alt="GenAI Logo" style="height: 50px; width: auto;">
      <p style="color: #64748b; font-size: 16px; margin-top: 10px;">Transform Your Career with AI</p>
    </div> 
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 10px;">Welcome Aboard, ${name}! 🎉</h2>
      <p style="color: #475569; font-size: 16px; line-height: 1.6;">
        We're thrilled to have you join our community of learners. Your account has been successfully created and you're ready to start exploring our cutting-edge AI courses.
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.FRONTEND_URL}/courses" style="background-color: #2563eb; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s;">
        Start Learning Now
      </a>
    </div>

    <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
      <p style="color: #64748b; font-size: 14px; text-align: center;">
        Need help? Contact our support team or visit our Help Center.
      </p>
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 10px;">
        © ${new Date().getFullYear()} GENAICOURSE.IO. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

export default welcomeTemplate;
