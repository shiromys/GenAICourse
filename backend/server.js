import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression'; // High-performance payload shrinking

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env before other imports
dotenv.config({ path: path.join(__dirname, '.env') });

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
import assessmentUploadRoutes from './routes/assessmentUpload.js';
import courseAssessmentRoutes from './routes/courseAssessment.js';
import paymentRoutes from './routes/paymentRoutes.js';
import passport from 'passport';
import configurePassport from './config/passport.js';
import { stripeWebhook } from './controllers/paymentController.js';

const app = express();

const startServer = async () => {
    await connectDB();

    // 1. Performance Compression for "Smooth Flow"
    app.use(compression());

    // 2. Dynamic CORS for Production
    const corsOptions = {
        origin: [
            'http://localhost:5173',
            process.env.FRONTEND_URL, // Set this to your Railway URL
        ].filter(Boolean),
        credentials: true,
    };
    app.use(cors(corsOptions));

    // Security & Auth
    app.use(helmet({
        contentSecurityPolicy: false, // Required if serving React from the same server
    }));
    configurePassport();
    app.use(passport.initialize());

    // 3. Webhook Handling (MUST stay before express.json)
    app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

    // Body Parsers
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // 4. API Route Mounting
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/quizzes', quizRoutes);
    app.use('/api/certificates', certificateRoutes);
    app.use('/api/learning-paths', learningPathRoutes);
    app.use('/api/assessments', assessmentRoutes);
    app.use('/api/payments', paymentRoutes);

    // 5. PRODUCTION STATIC FILE SERVING
    // This connects your "Continue Learning" dashboard and UI
    if (process.env.NODE_ENV === 'production') {
        const buildPath = path.join(__dirname, '../frontend/dist');
        app.use(express.static(buildPath));

        // Handle React Routing (SPA)
        app.get('*', (req, res) => {
            if (!req.originalUrl.startsWith('/api')) {
                res.sendFile(path.join(buildPath, 'index.html'));
            }
        });
    }

    // Error Handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server active in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

export default app;