import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(uri);
            console.log('✅ Connected to MongoDB for seeding');
        }

        // 1. Ensure Admin User
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@genaicourse.io';
        let adminUser = await User.findOne({ email: adminEmail });
        if (!adminUser) {
            console.log('Creating admin user...');
            adminUser = await User.create({
                name: 'System Admin',
                email: adminEmail,
                password: process.env.ADMIN_PASSWORD || 'Admin@123',
                role: 'admin'
            });
        }

        // 2. Updated Course Thumbnails Map
        const newThumbnails = {
            "Prompt-Based AI for Marketing and Content Strategy": "/uploads/prompt-based-ai-marketing-content-strategy.png",
            "AI Prompt Engineering for Research and Competitive Intelligence": "/uploads/ai-prompt-engineering-research-competitive-intelligence.png",
            "Prompt-Based AI for Customer Support and Service Teams": "/uploads/prompt-based-ai-customer-support-service-teams.png",
            "AI Prompting for Entrepreneurs and Startup Builders": "/uploads/ai-prompting-entrepreneurs-startup-builders.jpg",
            "Prompt Engineering for Sales and Customer Acquisition": "/uploads/prompt-engineering-sales-customer-acquisition.png",
            "Prompt-Based AI for Personal Productivity and Knowledge Work": "/uploads/productivity.jpg"
        };

        console.log('🔄 Syncing thumbnails with fuzzy matching...');
        let updated = 0;
        let missed = 0;

        for (const [title, path] of Object.entries(newThumbnails)) {
            // Use Regex to match title ignoring case and surrounding whitespace
            const fuzzyTitle = new RegExp(`^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i');
            
            const result = await Course.updateMany(
                { title: fuzzyTitle },
                { $set: { thumbnail: path } }
            );

            if (result.matchedCount > 0) {
                updated += result.matchedCount;
                console.log(`  ✓ Updated: "${title}" -> ${path} (${result.matchedCount} records)`);
            } else {
                missed++;
                console.log(`  × Match Failed: "${title}" (Check if this title exists exactly in your DB)`);
            }
        }

        console.log(`📊 Thumbnail Sync Summary: ${updated} courses updated, ${missed} course titles not found.`);
        
        if (import.meta.url === `file://${process.argv[1]}`) {
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        if (import.meta.url === `file://${process.argv[1]}`) {
            process.exit(1);
        }
    }
};

if (import.meta.url.includes(process.argv[1]) || process.env.RUN_SEED === 'true') {
    seedDatabase();
}

export default seedDatabase;
