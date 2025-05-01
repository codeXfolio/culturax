import express from 'express';
import creatorRoutes from './routes/creator.routes';
import errorHandler from './middlewares/errorHandler';
import logRequest from './middlewares/logRequest';
import validateSignature from './middlewares/validateSignature';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';
import collectionRoutes from './routes/collection.routes';
import feedRoutes from './routes/feed.routes';
import path from 'path';
import cors from 'cors';
import subscriptionRoutes from './routes/subscription.routes';
import {
  generalRateLimiter,
  authRateLimiter,
  uploadRateLimiter,
  apiRateLimiter,
} from './middlewares/rateLimit';

const app = express();

// Apply general rate limiter to all routes
app.use(generalRateLimiter);

app.use(express.json());
app.use(logRequest);
app.use(cors());

// Apply specific rate limiters and signature validation to protected routes
app.use('/api/creator', apiRateLimiter, validateSignature, creatorRoutes);
app.use('/api/user', apiRateLimiter, validateSignature, userRoutes);
app.use('/api/ai', apiRateLimiter, validateSignature, aiRoutes);
app.use(
  '/api/collection',
  uploadRateLimiter,
  validateSignature,
  collectionRoutes,
);
app.use('/api/feed', uploadRateLimiter, validateSignature, feedRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(
  '/api/subscription',
  apiRateLimiter,
  validateSignature,
  subscriptionRoutes,
);

app.use(errorHandler);

export default app;
