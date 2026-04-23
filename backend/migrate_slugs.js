import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/genaicourse').then(async () => {
    console.log('Connected to DB. Migrating slugs...');
    const courses = await Course.find({ slug: { $exists: false } });
    let count = 0;
    for (const c of courses) {
        c.slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await c.save();
        count++;
    }
    console.log('Migrated ' + count + ' courses.');
    process.exit(0);
}).catch(console.error);
