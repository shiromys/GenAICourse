import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc Generate a professional certificate PDF using PDFKit
 *       Pure Node.js — NO browser, NO Chrome, Railway-safe ✅
 */
export const generateCertificatePDF = async (certificateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                userName = 'Certificate Holder',
                courseTitle = 'Course Completion',
                score = 0,
                grade = 'Pass',
                completionDate = new Date(),
                certificateId = 'CERT-' + Date.now(),
                instructorName = 'GenAiCourse.io'
            } = certificateData;

            console.log(`Generating PDFKit certificate for: ${certificateId}`);

            const doc = new PDFDocument({
                size: 'A4',
                layout: 'landscape',
                margin: 0
            });

            const chunks = [];
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            const width = doc.page.width;
            const height = doc.page.height;

            const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // ── 1. Background Template Image ──────────────────────────────
            const bgPath = path.resolve(__dirname, '../../frontend/public/images/courses/Certificate template.png');
            try {
                await fs.access(bgPath);
                doc.image(bgPath, 0, 0, { width, height });
            } catch (e) {
                console.error("Certificate template image not found, falling back to white background from:", bgPath);
                doc.rect(0, 0, width, height).fill('#ffffff');
            }

            // ── 2. Top Logo ──────────────────────────────────────────────────
            const mainLogoPath = path.resolve(__dirname, '../../frontend/public/logo.png');
            try {
                await fs.access(mainLogoPath);
                doc.image(mainLogoPath, (width / 2) - 40, 20, { width: 80 });
            } catch (e) {
                console.error("Main logo not found for certificate, skipping...");
            }

            // ── 3. Recipient Name ────────────────────────────────────────────
            doc.fontSize(40).fillColor('#1e293b').font('Times-BoldItalic')
                .text(userName, 0, 270, { align: 'center', width: width });

            // ── 4. Completion Text ───────────────────────────────────────────
            doc.fontSize(14).fillColor('#64748b').font('Times-Roman')
                .text('has successfully completed the course', 0, 325, { align: 'center', width: width });

            // ── 5. Course Title ──────────────────────────────────────────────
            doc.fontSize(24).fillColor('#1e293b').font('Times-Bold')
                .text(courseTitle, 150, 360, { align: 'center', width: width - 300 });


            // ── 6. Certificate Verify Link (Below Course Name) ─────────────
            // Pushed down to 440 to ensure gap even if course name takes 2 lines
            const fullVerifyUrl = `${process.env.CLIENT_URL || 'https://genaicourse.io'}/v/${certificateId}`;
            const displayUrl = (process.env.CLIENT_URL || 'genaicourse.io').replace(/^https?:\/\//, '') + `/v/${certificateId}`;
            
            doc.fontSize(10).fillColor('#3b82f6').font('Helvetica')
                .text(`Verify at: ${displayUrl}`, 0, 440, { align: 'center', width: width, link: fullVerifyUrl, underline: true });

            // ── 7. Footer (Signatures and Date) ─────────────────────────────
            const footerY = 510;
            const lineLength = 180;

            // Date (Bottom Left, pushed further to the left edge)
            doc.fontSize(12).fillColor('#1e293b').font('Times-Roman')
                .text(formattedDate, 60, footerY - 5, { width: lineLength, align: 'center' });
            doc.fontSize(9).fillColor('#64748b').font('Helvetica-Bold')
                .text('DATE OF ISSUE', 60, footerY + 15, { width: lineLength, align: 'center', characterSpacing: 1 });

            // Signature Label (Center, avoiding the right-side badge completely)
            doc.fontSize(12).fillColor('#1e293b').font('Times-Roman')
                .text('GenAiCourse.io', (width / 2) - (lineLength / 2), footerY - 5, { width: lineLength, align: 'center' });
            doc.fontSize(9).fillColor('#64748b').font('Helvetica-Bold')
                .text('CERTIFYING AUTHORITY', (width / 2) - (lineLength / 2), footerY + 15, { width: lineLength, align: 'center', characterSpacing: 1 });

            doc.end();
        } catch (err) {
            console.error("PDF generation critical error:", err);
            reject(err);
        }
    });
};

/**
 * @desc    Generate HTML for certificate preview (used by /preview endpoint)
 */
export function generateCertificateHTML(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1e293b;
            --accent: #1e293b;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Montserrat', sans-serif;
            background: #f8fafc;
            width: 297mm;
            height: 210mm;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .certificate-container {
            width: 285mm;
            height: 195mm;
            background-color: #fff;
            background-image: url('${process.env.FRONTEND_URL}/images/courses/Certificate%20template.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .content {
            margin-top: 250px;
            text-align: center;
            color: var(--primary);
            padding: 0 100px;
        }
        .name {
            font-family: 'Playfair Display', serif;
            font-size: 52px;
            font-style: italic;
            font-weight: 700;
            margin-bottom: 25px;
            color: #1e293b;
        }
        .certify-text {
            font-size: 18px;
            color: #64748b;
            margin-bottom: 15px;
        }
        .course-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #1e293b;
            max-width: 75%;
            margin-left: auto;
            margin-right: auto;
        }
        .cert-id {
            font-size: 13px;
            color: #64748b;
            font-family: monospace;
            margin-top: 40px; /* Increased gap */
        }
        .logo-top {
            position: absolute;
            top: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: auto;
        }
        .footer-date {
            position: absolute;
            bottom: 95px;
            left: 80px; /* Pushed further left */
            text-align: left;
            min-width: 200px;
        }
        .footer-sig {
            position: absolute;
            bottom: 95px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            min-width: 200px;
        }
        .sig-block {
            text-align: center;
            min-width: 180px;
        }
        .sig-val {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 5px;
            color: #1e293b;
            font-family: 'Playfair Display', serif;
        }
        .sig-label {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-top: 1px solid #cbd5e1;
            padding-top: 8px;
        }
        .cert-id {
            position: absolute;
            bottom: 30px;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <img src="${process.env.FRONTEND_URL}/logo.png" alt="Logo" class="logo-top" onerror="this.style.display='none'" />
        <div class="content">
            <h1 class="name">${data.userName}</h1>
            <p class="certify-text">has successfully completed the course</p>
            <h2 class="course-title">${data.courseTitle}</h2>
            <div class="cert-id">
                <a href="${process.env.FRONTEND_URL}/v/${data.certificateId}" target="_blank" style="color: #3b82f6; text-decoration: underline;">
                    Verify at: ${process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/^https?:\/\//, '') : 'genaicourse.io'}/v/${data.certificateId}
                </a>
            </div>
        </div>
        
        <div class="footer-date">
            <div class="sig-val">${new Date(data.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="sig-label">Date of Issue</div>
        </div>
        <div class="footer-sig">
            <div class="sig-val">GenAiCourse.io</div>
            <div class="sig-label">Certifying Authority</div>
        </div>
    </div>
</body>
</html>
  `;
}