import express from 'express';
import creatorRoutes from './routes/creator.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/api/creator', creatorRoutes);

export default app;
