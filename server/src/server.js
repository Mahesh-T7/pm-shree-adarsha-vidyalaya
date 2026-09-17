import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { configureHelmet, configureCors, apiLimiter } from './middleware/security.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import noticesRoutes from './routes/notices.js';
import achievementsRoutes from './routes/achievements.js';
import galleryRoutes from './routes/gallery.js';
import settingsRoutes from './routes/settings.js';
import admissionsRoutes from './routes/admissions.js';
import mediaRoutes from './routes/media.js';
import auditRoutes from './routes/audit.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = process.env.PORT || 5000;

// 1. Security Headers & CORS
app.use(configureHelmet());
app.use(configureCors());

// 2. Parsers & Static uploads
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Static media files directory
const uploadsDir = path.resolve('uploads');
app.use('/uploads', express.static(uploadsDir));

// 3. Global API Rate Limiter
app.use('/api', apiLimiter);

// 4. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    school: 'PM SHRI Adarsha Vidyalaya Sindhanur',
    version: '2.0.0-production',
  });
});

// 5. Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api', admissionsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/audit-logs', auditRoutes);

// 6. 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` PM SHRI Adarsha Vidyalaya School Portal API`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
