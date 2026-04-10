/**
 * Certificate Email Template
 * 
 * Celebratory email for course completion.
 * 
 * @param {string} name - User's name
 * @param {string} courseTitle - Completed course title
 * @returns {string} HTML content
 */
export const certificateTemplate = (name, courseTitle) => `
<!DOCTYPE html>
<html>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #fce7f3; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0; border-radius: 16px; border-top: 8px solid #be185d; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
    
    <div style="text-align: center; padding: 25px 0 10px 0;">
      <img src="${process.env.FRONTEND_URL}/logo.png" alt="GenAI Logo" style="height: 50px; width: auto;">
    </div>

    <div style="background-color: #fb7185; padding: 40px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 36px; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Congratulations, ${name}! 🎓</h1>
      <p style="color: #ffffff; font-size: 18px; margin-top: 10px; font-weight: 500;">You've Achieved Something Great!</p>
    </div>

    <div style="padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <p style="color: #475569; font-size: 18px; margin: 0;">You have successfully completed the course:</p>
        <h2 style="color: #be185d; font-size: 28px; margin: 15px 0;">${courseTitle}</h2>
      </div>

      <div style="background-color: #fdf2f8; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
        <p style="color: #9d174d; font-size: 16px; font-weight: 600; margin: 0;">
          Your official certificate is ready you can Download it from your Profile or Dashboard.
        </p>
        <p style="color: #be185d; font-size: 14px; margin-top: 10px;">
          Feel free to download, print, or share your accomplishment on Social Media!
        </p>
      </div>

      <p style="color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
        We are incredibly proud of your dedication and hard work. Keep learning and growing!
      </p>

      <div style="text-align: center; margin-top: 40px;">
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #be185d; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block;">
          View Your Dashboard
        </a>
      </div>
    </div>

    <div style="background-color: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0;">
        © ${new Date().getFullYear()} GENAICOURSE.IO. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

export default certificateTemplate;
