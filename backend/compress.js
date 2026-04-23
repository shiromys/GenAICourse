import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');

async function compressThumbnails() {
    console.log('Starting image compression in:', uploadsDir);
    const files = fs.readdirSync(uploadsDir);

    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

        const filePath = path.join(uploadsDir, file);
        const tempPath = path.join(uploadsDir, `temp_${file}`);

        try {
            console.log(`Compressing ${file}...`);
            await sharp(filePath)
                .resize(800, null, { withoutEnlargement: true }) // reasonable max width
                .jpeg({ quality: 80, progressive: true, force: false })
                .png({ quality: 80, compressionLevel: 9, force: false })
                .toFile(tempPath);

            // Replace original with compressed version
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Successfully compressed: ${file}`);
        } catch (error) {
            console.error(`❌ Failed to compress ${file}:`, error);
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        }
    }
    console.log('Compression complete.');
}

compressThumbnails();
