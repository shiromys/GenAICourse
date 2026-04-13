import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const migrateRoles = async () => {
    try {
        console.log('🚀 Starting role migration: Fix invalid roles...');
        
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('❌ MONGODB_URI not found in environment');
            process.exit(1);
        }

        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Fix: Update any invalid roles to 'User'
        const result = await User.updateMany(
            { role: { $nin: ['User', 'student', 'instructor', 'admin'] } },
            { $set: { role: 'User' } }
        );
        console.log(`✅ Migration: Invalid roles -> 'User': ${result.modifiedCount} users updated`);

        await mongoose.connection.close();
        console.log('👋 Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrateRoles();
