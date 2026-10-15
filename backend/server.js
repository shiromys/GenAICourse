import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import compression from 'compression';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the backend directory explicitly
// This fixes the issue when npm run dev is run from the repo root with --prefix backend
dotenv.config({ path: path.resolve(__dirname, '.env') });

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import assessmentRoutes from './routes/assessment.js';
import assessmentUploadRoutes from './routes/assessmentUpload.js';
import courseAssessmentRoutes from './routes/courseAssessment.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import passport from 'passport';
import configurePassport from './config/passport.js';
import { stripeWebhook } from './controllers/paymentController.js';
import { generateSitemap } from './controllers/seoController.js';
import maintenanceGate from './middleware/maintenanceGate.js';

const app = express();

// Railway (and most PaaS hosts) put the app behind a reverse proxy, so the
// real client IP arrives via X-Forwarded-For. Without this, req.ip resolves
// to the proxy's address for every request — which would make the auth rate
// limiters below bucket ALL users together as "one IP" (one abusive client
// could lock out everyone) and is also required by express-rate-limit v7,
// which throws when it sees X-Forwarded-For without trust proxy configured.
app.set('trust proxy', 1);

const startServer = async () => {
    try {
        await connectDB();

        app.use(compression());

        const corsOptions = {
            origin: [
                'http://localhost:5173',
                'http://localhost:3000',
                process.env.FRONTEND_URL,
            ].filter(Boolean),
            credentials: true,
        };
        app.use(cors(corsOptions));

        // A real Content-Security-Policy, scoped to exactly what this app actually
        // loads: same-origin bundle + API, Stripe (Elements iframe + API + redirect
        // success page), Google Fonts, the optional post-consent GA4 tag, and the
        // Google Maps embed on the Contact page. img-src is intentionally left broad
        // (https: + data:) because admins can paste an arbitrary external thumbnail
        // URL for a course (CourseForm.jsx) — locking that down would silently break
        // existing course thumbnails.
        app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", 'https://www.googletagmanager.com', 'https://js.stripe.com'],
                    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
                    fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    connectSrc: [
                        "'self'",
                        'https://api.stripe.com',
                        'https://www.googletagmanager.com',
                        'https://www.google-analytics.com',
                        'https://analytics.google.com',
                    ],
                    frameSrc: ["'self'", 'https://js.stripe.com', 'https://hooks.stripe.com', 'https://www.google.com'],
                    objectSrc: ["'none'"],
                    baseUri: ["'self'"],
                    formAction: ["'self'"],
                    frameAncestors: ["'self'"],
                },
            },
        }));

        configurePassport();
        app.use(passport.initialize());

        // Webhook must be before express.json() parser
        app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

        app.use(express.json({ limit: '10mb' }));
        app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        }
        // Add this above your other routes
        app.get('/sitemap.xml', generateSitemap);
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

        // Settings status must be reachable even during maintenance (the frontend polls it
        // to decide whether to show the maintenance page). /api/auth stays open so an admin
        // can still log in, and /api/admin stays open (it already self-protects via
        // protect+authorize('admin') inside adminRoutes.js) so a logged-in admin can reach
        // the toggle that turns maintenance mode back off. Everything else mounted below
        // this point is subject to the gate.
        app.use('/api/settings', settingsRoutes);
        app.use('/api/auth', authRoutes);
        app.use('/api/admin', adminRoutes);
        app.use(maintenanceGate);

        // API Routes
        app.use('/api/courses', courseRoutes);
        app.use('/api/quizzes', quizRoutes);
        app.use('/api/certificates', certificateRoutes);
        app.use('/api/payments', paymentRoutes);
        app.use('/api/courses', courseAssessmentRoutes);
        app.use('/api/contact', contactRoutes);
        app.use('/api/blog', blogRoutes);

        // RECTIFIED: Specific upload routes before general assessment routes
        app.use('/api/assessments', assessmentUploadRoutes);
        app.use('/api/assessments', assessmentRoutes);

        // STATIC FILE SERVING
        // RECTIFIED: Aligns precisely with Docker root path (/app/uploads)
        // We use process.cwd() as the fallback for consistency in standard environments
        const uploadsPath = process.env.NODE_ENV === 'production'
            ? '/app/uploads'
            : path.resolve(__dirname, 'uploads');

        if (!fs.existsSync(uploadsPath)) {
            console.log(`📂 Creating missing uploads directory at: ${uploadsPath}`);
            fs.mkdirSync(uploadsPath, { recursive: true });
        }

        // Diagnostic: List files found in uploads directory on startup
        console.log(`📁 Static uploads folder mounted from: ${uploadsPath}`);
        try {
            const files = fs.readdirSync(uploadsPath);
            console.log(`🖼️  Files found in uploads (${files.length}):`, files.join(', '));
        } catch (err) {
            console.error('❌ Failed to read uploads directory:', err);
        }

        app.use('/uploads', express.static(uploadsPath));

        if (process.env.NODE_ENV === 'production') {

            // Build path resolution for Docker
            let buildPath = path.resolve(__dirname, '..', 'frontend', 'dist');

            if (!fs.existsSync(buildPath)) {
                buildPath = path.resolve(__dirname, 'frontend', 'dist');
            }

            console.log(`📡 Serving frontend from: ${buildPath}`);
            app.use(express.static(buildPath, {
                maxAge: '1d',
                etag: true,
                index: false,
                dotfiles: 'ignore'
            }));

            app.get('*', (req, res) => {
                if (!req.originalUrl.startsWith('/api')) {
                    res.sendFile(path.join(buildPath, 'index.html'));
                }
            });
        }

        app.use(errorHandler);

        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, async () => {
            const mode = process.env.NODE_ENV || 'development';
            const status = mongoose.connection.readyState === 1 ? 'CONNECTED' : 'OFFLINE';
            const localUrl = `http://localhost:${PORT}`;

            // ── PROFESSIONAL TERMINAL DESIGN ──────────────────────────────────
            console.log('\n' + '='.repeat(50));
            console.log(` 🚀  GENAICOURSE.IO — BACKEND ACTIVE `);
            console.log('='.repeat(50));
            console.log(` 📡  STATUS      :  Active`);
            console.log(` 🌍  ENVIRONMENT :  ${mode.toUpperCase()}`);
            console.log(` 🔌  PORT        :  ${PORT}`);
            console.log(` 💾  DATABASE    :  ${status}`);
            console.log(` 🔗  LOCAL URL   :  ${localUrl}`);
            console.log('='.repeat(50));

            // Auto-Seed Capability: If RUN_SEED=true is in environment, run the database update
            if (process.env.RUN_SEED === 'true') {
                console.log(' 🌱  AUTO-SEED   :  In Progress...');
                try {
                    const { default: seedDatabase } = await import('./seed.js');
                } catch (seedErr) {
                    console.error('❌ Failed to run auto-seed:', seedErr);
                }
            }
            console.log('='.repeat(50) + '\n');
        });
    } catch (err) {
        console.error('❌ CRITICAL: Failed to initialize server:', err);
        process.exit(1);
    }
};

startServer();


export default app;