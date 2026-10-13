import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { config } from './config/index.js';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { seedDatabase } from './utils/seed.js';

const app = express();

// Ensure upload directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

// 1. Security Headers (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows image loading across domains
  })
);

// 2. CORS Allowlist
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) or allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, adjust strictly in prod
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Body & Cookie Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 4. Rate Limiting on all API requests
app.use('/api/', generalLimiter);

// 5. Static uploads directory for media
app.use('/uploads', express.static(config.uploadDir));

// 6. Versioned API Routes
app.use('/api/v1', apiRouter);

// 7. Root status route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Madni Public School API',
    tagline: 'Building Knowledge, Character & A Brighter Future',
    classes: 'Classes 1 to 8',
    location: 'Madni Town, near Shah Alam Abad, D.I. Khan, KPK, Pakistan',
    phone: '0318-9969994',
    endpoints: '/api/v1',
    status: 'online',
  });
});

// 8. 404 Route Handler for undefined endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// 9. Centralized Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
});

// 10. Start Server
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  const server = app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(` Madni Public School API Server`);
    console.log(` Serving: Classes 1 to 8 | D.I. Khan, KPK, Pakistan`);
    console.log(` Port: ${config.port}`);
    console.log(` Environment: ${config.nodeEnv}`);
    console.log(` API Base: http://localhost:${config.port}/api/v1`);
    console.log(`====================================================`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\n[Server] Shutting down gracefully...');
    server.close(() => {
      console.log('[Server] Closed remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();

export default app;
