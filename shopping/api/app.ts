/**
 * This is a API server
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// routes
import authRoutes from './routes/auth.js';
import ticketRoutes from './routes/tickets.js';
import memberRoutes from './routes/members.js';
import orderRoutes from './routes/orders.js';
import assetRoutes from './routes/assets.js';
import dashboardRoutes from './routes/dashboard.js';
import braceletRoutes from './routes/bracelets.js';
import reportRoutes from './routes/reports.js';
import userRoutes from './routes/users.js';
import deviceRoutes from './routes/devices.js';
import couponRoutes from './routes/coupons.js';
import announcementRoutes from './routes/announcements.js';

// for esm mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load env
dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bracelets', braceletRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/system', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/announcements', announcementRoutes);

/**
 * health
 */
app.use(
  '/api/health',
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
    });
  },
);

/**
 * error handler middleware
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  });
});

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  });
});

export default app;
