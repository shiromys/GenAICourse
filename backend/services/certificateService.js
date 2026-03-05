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

            const W = doc.page.width;   // ~841
            const H = doc.page.height;  // ~595

            // ── Background ──────────────────────────────────────────────
            doc.rect(0, 0, W, H).fill('#ffffff');

            // Top gradient bar
            doc.rect(0, 0, W, 14).fill('#1e293b');

            // Bottom bar
            doc.rect(0, H - 14, W, 14).fill('#1e293b');

            // Left bar
            doc.rect(0, 0, 14, H).fill('#1e293b');

            // Right bar
            doc.rect(W - 14, 0, 14, H).fill('#1e293b');

            // Accent top bar accent stripe
            doc.rect(0, 0, W, 8).fill('#8b5cf6');

            // ── Corner Ornaments ────────────────────────────────────────
            const gold = '#d4af37';
            const cornerSize = 40;
            const cornerOffset = 22;

            // Top-left
            doc.moveTo(cornerOffset, cornerOffset + cornerSize)
                .lineTo(cornerOffset, cornerOffset)
                .lineTo(cornerOffset + cornerSize, cornerOffset)
                .lineWidth(2).strokeColor(gold).stroke();

            // Top-right
            doc.moveTo(W - cornerOffset - cornerSize, cornerOffset)
                .lineTo(W - cornerOffset, cornerOffset)
                .lineTo(W - cornerOffset, cornerOffset + cornerSize)
                .lineWidth(2).strokeColor(gold).stroke();

            // Bottom-left
            doc.moveTo(cornerOffset, H - cornerOffset - cornerSize)
                .lineTo(cornerOffset, H - cornerOffset)
                .lineTo(cornerOffset + cornerSize, H - cornerOffset)
                .lineWidth(2).strokeColor(gold).stroke();

            // Bottom-right
            doc.moveTo(W - cornerOffset - cornerSize, H - cornerOffset)
                .lineTo(W - cornerOffset, H - cornerOffset)
                .lineTo(W - cornerOffset, H - cornerOffset - cornerSize)
                .lineWidth(2).strokeColor(gold).stroke();

            // ── Header: Authority ────────────────────────────────────────
            doc.fontSize(11)
                .fillColor('#64748b')
                .font('Helvetica')
                .text('CERTIFYING AUTHORITY', 0, 38, {
                    align: 'center',
                    characterSpacing: 3
                });

            // ── Main Title ───────────────────────────────────────────────
            doc.fontSize(52)
                .fillColor('#1e293b')
                .font('Helvetica-Bold')
                .text('CERTIFICATE', 0, 58, { align: 'center', characterSpacing: 5 });

            doc.fontSize(13)
                .fillColor('#8b5cf6')
                .font('Helvetica')
                .text('OF ACHIEVEMENT', 0, 118, { align: 'center', characterSpacing: 6 });

            // Decorative divider line
            doc.moveTo(W / 2 - 160, 148)
                .lineTo(W / 2 + 160, 148)
                .lineWidth(1)
                .strokeColor('#e2e8f0')
                .stroke();

            // ── Certify Text ─────────────────────────────────────────────
            doc.fontSize(13)
                .fillColor('#94a3b8')
                .font('Helvetica-Oblique')
                .text('This is to officially certify that', 0, 162, { align: 'center' });

            // ── Student Name ─────────────────────────────────────────────
            doc.fontSize(36)
                .fillColor('#8b5cf6')
                .font('Helvetica-Bold')
                .text(userName, 0, 188, { align: 'center', characterSpacing: 1 });

            // Name underline
            const nameWidth = Math.min(doc.widthOfString(userName) * 1.1, 400);
            doc.moveTo(W / 2 - nameWidth / 2, 232)
                .lineTo(W / 2 + nameWidth / 2, 232)
                .lineWidth(1)
                .strokeColor('#e2e8f0')
                .stroke();

            // ── Achievement Text ─────────────────────────────────────────
            doc.fontSize(11)
                .fillColor('#64748b')
                .font('Helvetica')
                .text('has demonstrated exceptional mastery and successfully completed all requirements for', 0, 244, {
                    align: 'center',
                    width: W
                });

            // ── Course Title ─────────────────────────────────────────────
            doc.fontSize(20)
                .fillColor('#1e293b')
                .font('Helvetica-Bold')
                .text(courseTitle, 60, 270, { align: 'center', width: W - 120 });

            // ── Score Badge ──────────────────────────────────────────────
            const badgeY = 316;
            const badgeText = `Achievement Score: ${score}%  |  Grade: ${grade}`;
            doc.fontSize(11)
                .fillColor('#1e293b')
                .font('Helvetica-Bold')
                .text(badgeText, 0, badgeY, { align: 'center', characterSpacing: 1 });

            // ── Footer Section ───────────────────────────────────────────
            const footerY = 370;

            // Date signature
            const dateStr = new Date(completionDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Left signature: Date
            doc.fontSize(13)
                .fillColor('#1e293b')
                .font('Helvetica-Oblique')
                .text(dateStr, 80, footerY, { width: 200, align: 'center' });

            doc.moveTo(80, footerY + 22)
                .lineTo(280, footerY + 22)
                .lineWidth(1).strokeColor('#cbd5e1').stroke();

            doc.fontSize(8)
                .fillColor('#64748b')
                .font('Helvetica')
                .text('DATE OF ISSUE', 80, footerY + 28, { width: 200, align: 'center', characterSpacing: 2 });

            // Center: Certificate ID
            doc.fontSize(8)
                .fillColor('#94a3b8')
                .font('Helvetica')
                .text(`Certificate ID: ${certificateId}`, 0, footerY + 18, { align: 'center', characterSpacing: 1 });

            // Try to embed logo if it exists
            const logoPath = path.resolve(__dirname, '../../frontend/public/certified logo.png');
            try {
                await fs.access(logoPath);
                doc.image(logoPath, W / 2 - 35, footerY - 12, { width: 70, height: 70 });
            } catch (e) {
                // No logo — draw a simple seal circle
                doc.circle(W / 2, footerY + 10, 28)
                    .lineWidth(2).strokeColor(gold).stroke();
                doc.fontSize(7).fillColor(gold).font('Helvetica-Bold')
                    .text('CERTIFIED', W / 2 - 20, footerY + 4, { width: 40, align: 'center' });
            }

            // Right signature: Authority
            doc.fontSize(13)
                .fillColor('#1e293b')
                .font('Helvetica-Oblique')
                .text('GenAiCourse.io', W - 280, footerY, { width: 200, align: 'center' });

            doc.moveTo(W - 280, footerY + 22)
                .lineTo(W - 80, footerY + 22)
                .lineWidth(1).strokeColor('#cbd5e1').stroke();

            doc.fontSize(8)
                .fillColor('#64748b')
                .font('Helvetica')
                .text('CERTIFYING AUTHORITY', W - 280, footerY + 28, { width: 200, align: 'center', characterSpacing: 2 });

            doc.end();
        } catch (err) {
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
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1e293b;
            --accent: #8b5cf6;
            --gold: #d4af37;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
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
        .border-line { position: absolute; background: var(--primary); z-index: 10; }
        .top-line { height: 8px; top: 0; left: 0; right: 0; background: linear-gradient(90deg, var(--primary), var(--accent)); }
        .bottom-line { height: 8px; bottom: 0; left: 0; right: 0; }
        .left-line { width: 8px; top: 0; bottom: 0; left: 0; }
        .right-line { width: 8px; top: 0; bottom: 0; right: 0; }
        .corner { position: absolute; width: 50px; height: 50px; border: 3px solid var(--gold); z-index: 11; }
        .tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
        .tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
        .bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
        .br { bottom: 12px; right: 12px; border-left: none; border-top: none; }
        .content { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; z-index: 5; padding: 15px 70px; }
        .logo { font-family: 'Cinzel', serif; font-size: 24px; color: var(--primary); letter-spacing: 2px; margin-bottom: 25px; }
        .main-title { font-family: 'Cinzel', serif; font-size: 44px; color: var(--primary); margin-bottom: 2px; letter-spacing: 4px; }
        .sub-header { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 35px; }
        .certify-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: 18px; color: #94a3b8; margin-bottom: 15px; }
        .name { font-family: 'Cinzel', serif; font-size: 40px; color: var(--accent); margin-bottom: 20px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0; min-width: 400px; }
        .achievement-text { font-size: 14px; color: #64748b; margin-bottom: 15px; max-width: 600px; }
        .course-name { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--primary); font-weight: 700; margin-bottom: 30px; }
        .score-box { margin-bottom: 40px; text-align: center; }
        .score-val { font-size: 14px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; }
        .footer-sigs { width: 100%; display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-bottom: 20px; }
        .sig { width: 220px; text-align: center; }
        .sig-font { font-family: 'Playfair Display', serif; font-size: 18px; font-style: italic; margin-bottom: 5px; color: var(--primary); }
        .sig-line { height: 1px; background: #cbd5e1; margin-bottom: 8px; }
        .sig-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
        .certified-logo-box { display: flex; align-items: center; justify-content: center; }
        .certified-logo { height: 110px; width: auto; object-fit: contain; }
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
                <span class="score-val">ACHIEVEMENT: ${data.score}% Score &nbsp;|&nbsp; Grade: ${data.grade}</span>
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