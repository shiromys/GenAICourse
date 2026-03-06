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

            // ── 1. Page Background & Frame ──────────────────────────────
            doc.rect(0, 0, width, height).fill('#ffffff');

            const margin = 20;
            const borderThickness = 8;

            // Top gradient line (matches HTML top-line)
            const grad = doc.linearGradient(margin, margin, width - margin, margin);
            grad.stop(0, '#1e293b').stop(1, '#8b5cf6');
            doc.rect(margin, margin, width - margin * 2, borderThickness).fill(grad);

            // Bottom, Left, Right solid navy lines
            doc.rect(margin, height - margin - borderThickness, width - margin * 2, borderThickness).fill('#1e293b');
            doc.rect(margin, margin, borderThickness, height - margin * 2).fill('#1e293b');
            doc.rect(width - margin - borderThickness, margin, borderThickness, height - margin * 2).fill('#1e293b');

            // ── 2. Corner Gold Ornaments ─────────────────────────────────────
            const gold = '#d4af37';
            const cornerSize = 40;
            const cornerMargin = margin + borderThickness + 6;

            const drawCorner = (x, y, xDir, yDir) => {
                doc.save()
                    .moveTo(x, y + (yDir * cornerSize))
                    .lineTo(x, y)
                    .lineTo(x + (xDir * cornerSize), y)
                    .lineWidth(2)
                    .stroke(gold)
                    .restore();
            };

            drawCorner(cornerMargin, cornerMargin, 1, 1);       // Top Left
            drawCorner(width - cornerMargin, cornerMargin, -1, 1);  // Top Right
            drawCorner(cornerMargin, height - cornerMargin, 1, -1); // Bottom Left
            drawCorner(width - cornerMargin, height - cornerMargin, -1, -1); // Bottom Right



            // ── 4. Main Titles ───────────────────────────────────────────────
            doc.fontSize(46).fillColor('#1e293b').font('Times-Roman')
                .text('CERTIFICATE', 0, 105, { align: 'center', characterSpacing: 8 });

            doc.fontSize(12).fillColor('#64748b').font('Times-Roman')
                .text('OF ACHIEVEMENT', 0, 160, { align: 'center', characterSpacing: 6 });

            // ── 5. This is to Certify... ─────────────────────────────────────
            doc.fontSize(14).fillColor('#94a3b8').font('Times-Italic')
                .text('This is to officially certify that', 0, 215, { align: 'center' });

            // ── 6. Recipient Name ────────────────────────────────────────────
            // Divider lines above and below
            doc.lineWidth(0.5).strokeColor('#e2e8f0');
            doc.moveTo(width / 2 - 200, 250).lineTo(width / 2 + 200, 250).stroke();

            // Purple elegant name
            doc.fontSize(40).fillColor('#8b5cf6').font('Times-Roman')
                .text(userName.toUpperCase(), 0, 265, { align: 'center' });

            doc.lineWidth(0.5).strokeColor('#e2e8f0');
            doc.moveTo(width / 2 - 200, 320).lineTo(width / 2 + 200, 320).stroke();

            // ── 7. Course Completion Text ────────────────────────────────────
            doc.fontSize(11).fillColor('#64748b').font('Times-Roman')
                .text('has successfully completed the course', 0, 350, { align: 'center' });


            doc.fontSize(22).fillColor('#1e293b').font('Times-Bold')
                .text(courseTitle, 60, 410, { align: 'center', width: width - 120 });


            // ── 9. Footer Signatures ─────────────────────────────────────────
            const footerY = height - 70;
            const lineLength = 180;

            // LEFT: Date of Issue
            doc.fontSize(14).fillColor('#1e293b').font('Times-Italic')
                .text(formattedDate, 80, footerY - 25, { width: lineLength, align: 'center' });

            doc.lineWidth(1).strokeColor('#cbd5e1').moveTo(80, footerY).lineTo(80 + lineLength, footerY).stroke();

            doc.fontSize(9).font('Helvetica-Bold').fillColor('#64748b')
                .text('DATE OF ISSUE', 80, footerY + 10, { width: lineLength, align: 'center', characterSpacing: 2 });

            // RIGHT: Certifying Authority Signature
            doc.fontSize(14).fillColor('#1e293b').font('Times-Italic')
                .text('Certifying Authority', width - 80 - lineLength, footerY - 25, { width: lineLength, align: 'center' });

            doc.lineWidth(1).strokeColor('#cbd5e1').moveTo(width - 80 - lineLength, footerY).lineTo(width - 80, footerY).stroke();

            doc.fontSize(9).font('Helvetica-Bold').fillColor('#64748b')
                .text('GenAiCourse.io', width - 80 - lineLength, footerY + 10, { width: lineLength, align: 'center', characterSpacing: 2 });

            // ── 10. Central Digital Seal ─────────────────────────────────────
            const sealX = width / 2 - 35;
            const sealY = height - 120; // Nestled neatly between text and bottom

            try {
                if (await fs.access(path.resolve(__dirname, '../../frontend/public/certified logo.png')).then(() => true).catch(() => false)) {
                    doc.image(path.resolve(__dirname, '../../frontend/public/certified logo.png'), sealX, sealY, { width: 70 });
                } else {
                    doc.save()
                        .translate(width / 2, sealY + 35)
                        .rotate(-15)
                        .circle(0, 0, 30).lineWidth(2).strokeColor('#ef4444').stroke();
                    doc.fontSize(8).fillColor('#ef4444').font('Helvetica-Bold')
                        .text('CERTIFIED', -25, -3, { width: 50, align: 'center' });
                    doc.restore();
                }
            } catch (e) {
                console.error("Logo failed:", e.message);
            }

            // Kept ID subtle out of the way to maintain clear canvas
            doc.fontSize(6).fillColor('#cbd5e1').font('Helvetica')
                .text(`ID: ${certificateId}`, 0, height - 20, { align: 'center' });

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
            <div class="logo"></div>
            <h1 class="main-title">CERTIFICATE</h1>
            <p class="sub-header">OF ACHIEVEMENT</p>
            <p class="certify-text">This is to officially certify that</p>
            <h2 class="name">${data.userName}</h2>
            <p class="achievement-text">has successfully completed the course</p>
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
                    <div class="sig-font">Certifying Authority</div>
                    <div class="sig-line"></div>
                    <div class="sig-label">GenAiCourse.io</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}