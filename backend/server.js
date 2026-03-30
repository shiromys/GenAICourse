import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import learningPathRoutes from './routes/learningPathRoutes.js';
import assessmentRoutes from './routes/assessment.js';
import assessmentUploadRoutes from './routes/assessmentUpload.js'; // Added missing import
import courseAssessmentRoutes from './routes/courseAssessment.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import passport from 'passport';
import configurePassport from './config/passport.js';
import { stripeWebhook } from './controllers/paymentController.js';

const app = express();


// ... AFTER other imports, and BEFORE startServer initialization, let's look at where routes are placed ...
// Actually, I should update the startServer function's route list.

const startServer = async () => {
    await connectDB();

    app.use(compression());

    const corsOptions = {
        origin: [
            'http://localhost:5173',
            process.env.FRONTEND_URL,
        ].filter(Boolean),
        credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(helmet({
        contentSecurityPolicy: false,
    }));
    configurePassport();
    app.use(passport.initialize());

    // Webhook must be before express.json()
    app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Health check endpoint
    app.get('/health', (req, res) => {
        res.json({
            success: true,
            message: 'Backend is running',
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        });
    });

    // API Routes - Organized to avoid conflicts
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/quizzes', quizRoutes);
    app.use('/api/certificates', certificateRoutes);
    app.use('/api/learning-paths', learningPathRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/courses', courseAssessmentRoutes);
    app.use('/api/contact', contactRoutes);

    // RECTIFIED: Specific upload routes must come BEFORE general assessment routes
    app.use('/api/assessments', assessmentUploadRoutes);
    app.use('/api/assessments', assessmentRoutes);

    // STATIC FILE SERVING FOR PRODUCTION
    if (process.env.NODE_ENV === 'production') {
        // Fallback-friendly build path resolution
        let buildPath = path.resolve(__dirname, '..', 'frontend', 'dist');

        // Check if path exists, otherwise adjust for alternate container structures
        if (!fs.existsSync(buildPath)) {
            buildPath = path.resolve(__dirname, 'frontend', 'dist'); // Try local if parent fails
        }

        console.log(`📡 Serving static files from: ${buildPath}`);
        app.use(express.static(buildPath));

        app.get('*', (req, res) => {
            if (!req.originalUrl.startsWith('/api')) {
                res.sendFile(path.join(buildPath, 'index.html'));
            }
        });
    }

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server active on port ${PORT}`);
    });
};

startServer();

export default app;