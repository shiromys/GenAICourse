import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri).then(async () => {
  console.log('Connected to DB');
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
});
