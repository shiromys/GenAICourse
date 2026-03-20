/**
 * Contact Form Email Template
 */

export const contactTemplate = (data) => {
    const { name, email, subject, message } = data;

    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
        .header { background: #0f172a; color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
        .header p { margin: 8px 0 0; color: #94a3b8; font-size: 14px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .content { padding: 40px; }
        .field { margin-bottom: 24px; }
        .label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 16px; color: #0f172a; font-weight: 500; }
        .message-box { background: #f1f5f9; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444; margin-top: 8px; white-space: pre-wrap; color: #334155; }
        .footer { padding: 24px; text-align: center; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${process.env.FRONTEND_URL}/logo.png" alt="GenAI Logo" style="height: 40px; width: auto; margin-bottom: 10px; filter: brightness(0) invert(1);">
            <p>New Inquiry Received</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">From</div>
                <div class="value">${name} &lt;${email}&gt;</div>
            </div>
            
            <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
            </div>
            
            <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
            </div>
        </div>
        <div class="footer">
            This message was sent from the official contact form at GENAICOURSE.IO
        </div>
    </div>
</body>
</html>
    `;
};
