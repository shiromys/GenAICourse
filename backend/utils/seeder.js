import User from '../models/User.js';
import Course from '../models/Course.js';

/**
 * Database Seeder
 * Seeds the database with initial admin user and sample courses
 * Run with: node utils/seeder.js
 */

const seedDatabase = async () => {
    try {
        // Create admin user if doesn't exist
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@genaicourse.io';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const admin = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: process.env.ADMIN_PASSWORD || 'Admin@123',
                role: 'admin'
            });
            console.log('✅ Admin user created:', admin.email);
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        // Sample course data
        const sampleCourses = [
            {
                title: 'Full Stack Web Development with MERN',
                description: 'Master MongoDB, Express.js, React, and Node.js to build modern web applications from scratch.',
                category: 'Web Development',
                level: 'Intermediate',
                thumbnail: 'https://via.placeholder.com/400x250?text=MERN+Stack',
                isPublished: true,
                createdBy: existingAdmin?._id || (await User.findOne({ role: 'admin' }))._id,
                modules: [
                    {
                        title: 'Module 1: Introduction to MERN Stack',
                        description: 'Overview of the MERN technology stack',
                        order: 1,
                        lessons: [
                            {
                                title: 'What is MERN Stack?',
                                content: 'MERN is a full-stack JavaScript framework consisting of MongoDB, Express.js, React, and Node.js. It enables developers to build powerful web applications using JavaScript throughout.',
                                keyPoints: [
                                    'MongoDB: NoSQL database',
                                    'Express.js: Backend framework',
                                    'React: Frontend library',
                                    'Node.js: JavaScript runtime'
                                ],
                                duration: 20
                            }
                        ]
                    }
                ]
            }
        ];

        // Check if courses already exist
        const existingCourses = await Course.countDocuments();
        if (existingCourses === 0) {
            await Course.insertMany(sampleCourses);
            console.log('✅ Sample courses created');
        } else {
            console.log('ℹ️  Courses already exist');
        }

        console.log('✅ Database seeding completed successfully');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

export default seedDatabase;
