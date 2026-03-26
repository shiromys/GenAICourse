import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(async () => {
  console.log('Connected to DB');
  const allCourses = await Course.find({});
  console.log('All course titles:', allCourses.map(c => c.title));
  
  const result = await Course.deleteMany({ title: /Introduction to Generative AI/i });
  console.log(`Deleted ${result.deletedCount} courses using Regex`);
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
});
