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
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(logRequest);
app.use(cors());

app.use('/api/creator', validateSignature, creatorRoutes);
app.use('/api/user', validateSignature, userRoutes);
app.use('/api/ai', validateSignature, aiRoutes);
app.use('/api/collection', validateSignature, collectionRoutes);
app.use('/api/feed', validateSignature, feedRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/subscription', validateSignature, subscriptionRoutes);

app.use(errorHandler);

export default app;
