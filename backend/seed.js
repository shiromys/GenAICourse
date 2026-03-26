
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

        // Create Admin User
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

        // No sample courses created as per request.
        console.log('ℹ️ Sample courses skipped');

        console.log('🎉 Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
