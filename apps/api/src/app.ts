import express from 'express';
import creatorRoutes from './routes/creator.routes';
import errorHandler from './middlewares/errorHandler';
import logRequest from './middlewares/logRequest';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import openApiDocumentation from '../openapi.json';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';
import collectionRoutes from './routes/collection.routes';
import feedRoutes from './routes/feed.routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(logRequest);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/api/creator', creatorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/collection', collectionRoutes);
app.use('/api/feed', feedRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(errorHandler);

export default app;
