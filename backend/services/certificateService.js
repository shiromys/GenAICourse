import htmlPdf from 'html-pdf-node';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Generate PDF certificate using html-pdf-node (Railway-compatible, no system Chrome needed)
export const generateCertificatePDF = async (certificateData) => {
    try {
        console.log('Starting PDF generation for certificate:', certificateData.certificateId);

        // Validate required fields
        if (!certificateData.userName || !certificateData.courseTitle || !certificateData.certificateId) {
            throw new Error('Missing required certificate data: userName, courseTitle, and certificateId are required');
        }

        // Read the certified logo and convert to base64
        const logoPath = path.resolve(__dirname, '../../frontend/public/certified logo.png');
        let logoBase64 = '';
        try {
            const logoBuffer = await fs.readFile(logoPath);
            logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
        } catch (e) {
            console.warn('Logo file not found, proceeding without it:', e.message);
        }

        // Generate HTML certificate
        const html = generateCertificateHTML({ ...certificateData, certifiedLogo: logoBase64 });

        const file = { content: html };
        const options = {
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        };

        const pdfBuffer = await htmlPdf.generatePdf(file, options);

        if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('Generated PDF is empty');
        }

        console.log(`PDF generated successfully for certificate: ${certificateData.certificateId}`);
        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF certificate:', error);
        throw new Error(`Failed to generate PDF certificate: ${error.message}`);
    }
};

// @desc    Generate HTML for certificate - Professional Redesign
export function generateCertificateHTML(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1e293b;
            --accent: #8b5cf6;
            --gold: #d4af37;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Montserrat', sans-serif;
            background: #fff;
            width: 297mm;
            height: 210mm;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        
        .certificate-wrapper {
            width: 285mm;
            height: 198mm;
            background: white;
            position: relative;
            padding: 10px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        
        /* Premium Borders */
        .border-line {
            position: absolute;
            background: var(--primary);
            z-index: 10;
        }
        
        .top-line { height: 8px; top: 0; left: 0; right: 0; background: linear-gradient(90deg, var(--primary), var(--accent)); }
        .bottom-line { height: 8px; bottom: 0; left: 0; right: 0; }
        .left-line { width: 8px; top: 0; bottom: 0; left: 0; }
        .right-line { width: 8px; top: 0; bottom: 0; right: 0; }
        
        .corner {
            position: absolute;
            width: 50px;
            height: 50px;
            border: 3px solid var(--gold);
            z-index: 11;
        }
        .tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
        .tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
        .bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
        .br { bottom: 12px; right: 12px; border-left: none; border-top: none; }
        
        .content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            z-index: 5;
            padding: 15px 70px;
        }
        
        .logo {
            font-family: 'Cinzel', serif;
            font-size: 24px;
            color: var(--primary);
            letter-spacing: 2px;
            margin-bottom: 25px;
        }
        
        .main-title {
            font-family: 'Cinzel', serif;
            font-size: 44px;
            color: var(--primary);
            margin-bottom: 2px;
            letter-spacing: 4px;
        }
        
        .sub-header {
            font-size: 14px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 35px;
        }
        
        .certify-text {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 18px;
            color: #94a3b8;
            margin-bottom: 15px;
        }
        
        .name {
            font-family: 'Cinzel', serif;
            font-size: 40px;
            color: var(--accent);
            margin-bottom: 20px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e2e8f0;
            min-width: 400px;
        }
        
        .achievement-text {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 15px;
            max-width: 600px;
        }
        
        .course-name {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: var(--primary);
            font-weight: 700;
            margin-bottom: 30px;
        }
        
        .score-box {
            margin-bottom: 40px;
            text-align: center;
        }
        
        .score-val {
            font-size: 14px;
            font-weight: 800;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer-sigs {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-bottom: 20px;
        }
        
        .sig {
            width: 220px;
            text-align: center;
        }
        
        .sig-font {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            font-style: italic;
            margin-bottom: 5px;
            color: var(--primary);
        }
        
        .sig-line {
            height: 1px;
            background: #cbd5e1;
            margin-bottom: 8px;
        }
        
        .sig-label {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
        }
        
        .certified-logo-box {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .certified-logo {
            height: 110px;
            width: auto;
            object-fit: contain;
        }
    </style>
</head>
<body>
    <div class="certificate-wrapper">
        <div class="border-line top-line"></div>
        <div class="border-line bottom-line"></div>
        <div class="border-line left-line"></div>
        <div class="border-line right-line"></div>
        
        <div class="corner tl"></div><div class="corner tr"></div>
        <div class="corner bl"></div><div class="corner br"></div>
        
        <div class="content">
            <div class="logo">CERTIFYING AUTHORITY</div>
            
            <h1 class="main-title">CERTIFICATE</h1>
            <p class="sub-header">OF ACHIEVEMENT</p>
            
            <p class="certify-text">This is to officially certify that</p>
            <h2 class="name">${data.userName}</h2>
            
            <p class="achievement-text">has demonstrated exceptional mastery and successfully completed all requirements for the professional certification in</p>
            <h3 class="course-name">${data.courseTitle}</h3>
            
            <div class="score-box">
                <span class="score-val">ACHIEVEMENT: ${data.score}% Score</span>
            </div>
            
            <div class="footer-sigs">
                <div class="sig">
                    <div class="sig-font">${new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div class="sig-line"></div>
                    <div class="sig-label">Date of Issue</div>
                </div>
                
                <div class="certified-logo-box">
                    ${data.certifiedLogo ? `<img src="${data.certifiedLogo}" class="certified-logo" alt="Certified" />` : ''}
                </div>
                
                <div class="sig">
                    <div class="sig-font">GenAiCourse.io</div>
                    <div class="sig-line"></div>
                    <div class="sig-label">Certifying Authority</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}