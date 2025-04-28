import express from 'express';
import creatorRoutes from './routes/creator.routes';
import errorHandler from './middlewares/errorHandler';
import logRequest from './middlewares/logRequest';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import openApiDocumentation from '../openapi.json';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';

const app = express();

app.use(express.json());
app.use(logRequest);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use('/api/creator', creatorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);

app.use(errorHandler);

export default app;
