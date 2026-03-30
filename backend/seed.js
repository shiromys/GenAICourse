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

        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB for seeding');

        // 1. Create Admin User
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
                    avatar: 'https://ui-avatars.com/api/?name=System+Admin&background=random'
                }
            });
            console.log('✅ Admin user created');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        // 2. Update existing course thumbnails
        // Note: These paths assume you have pushed the image files to backend/uploads/
        const newThumbnails = {
            "Prompt-Based AI for Marketing and Content Strategy": "/uploads/marketing-ai.jpg",
            "AI Prompt Engineering for Research and Competitive Intelligence": "/uploads/research-ai.jpg",
            "Prompt-Based AI for Customer Support and Service Teams": "/uploads/customer-ai.jpg",
            "AI Prompting for Entrepreneurs and Startup Builders": "/uploads/startup-ai.jpg",
            "Prompt Engineering for Sales and Customer Acquisition": "/uploads/sales-ai.jpg",
            "Prompt-Based AI for Personal Productivity and Knowledge Work": "/uploads/productivity-ai.jpg"
        };

        console.log('🔄 Updating course thumbnails...');
        for (const [title, path] of Object.entries(newThumbnails)) {
            const result = await Course.updateOne(
                { title: title },
                { $set: { thumbnail: path } }
            );
            if (result.matchedCount > 0) {
                console.log(`  ✓ Updated: ${title}`);
            } else {
                console.log(`  × Not Found: ${title}`);
            }
        }
        console.log('✅ Course thumbnails updated in database');

        console.log('🎉 Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();