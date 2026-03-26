import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(async () => {
  console.log('Connected to DB');
  const course = await Course.findOne({ 
    description: /Master the fundamentals of Generative AI/i 
  });
  
  if (course) {
    console.log(`Found course: "${course.title}". Deleting...`);
    await Course.deleteOne({ _id: course._id });
    console.log('Deleted successfully.');
  } else {
    console.log('Course not found in DB by description.');
  }
  
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
});
