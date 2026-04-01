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

        // Only connect if not already connected (prevents error when called from server.js)
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(uri);
            console.log('✅ Connected to MongoDB for seeding');
        } else {
            console.log('ℹ️ Using existing database connection for seeding');
        }

        // ... existing admin logic ...
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@genaicourse.io';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

        let adminUser = await User.findOne({ email: adminEmail });

        if (!adminUser) {
            console.log('Creating admin user...');
            adminUser = await User.create({
                name: 'System Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                profile: {
                    bio: 'System Administrator',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('System Admin')}&background=random`
                }
            });
            console.log('✅ Admin user created');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        // 2. Update existing course thumbnails
        // Matches exact filenames in backend/uploads
        const newThumbnails = {
            "Prompt-Based AI for Marketing and Content Strategy": "/uploads/prompt-based-ai-marketing-content-strategy.png",
            "AI Prompt Engineering for Research and Competitive Intelligence": "/uploads/ai-prompt-engineering-research-competitive-intelligence.png",
            "Prompt-Based AI for Customer Support and Service Teams": "/uploads/prompt-based-ai-customer-support-service-teams.png",
            "AI Prompting for Entrepreneurs and Startup Builders": "/uploads/ai-prompting-entrepreneurs-startup-builders.jpg",
            "Prompt Engineering for Sales and Customer Acquisition": "/uploads/prompt-engineering-sales-customer-acquisition.png",
            "Prompt-Based AI for Personal Productivity and Knowledge Work": "/uploads/productivity.jpg"
        };


        console.log('🔄 Updating course thumbnails in database...');
        let updatedCount = 0;
        for (const [title, path] of Object.entries(newThumbnails)) {
            const result = await Course.updateOne(
                { title: title },
                { $set: { thumbnail: path } }
            );
            if (result.matchedCount > 0) {
                updatedCount++;
                console.log(`  ✓ Updated: ${title} -> ${path}`);
            } else {
                console.log(`  × Not Found in DB: ${title}`);
            }
        }
        console.log(`✅ ${updatedCount} course(s) updated in database`);

        console.log('🎉 Seeding completed successfully!');
        
        // Only exit process if running as a standalone script
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

// Automatic execution when run directly
if (import.meta.url.includes(process.argv[1]) || process.env.RUN_SEED === 'true') {
     seedDatabase();
}

export default seedDatabase;