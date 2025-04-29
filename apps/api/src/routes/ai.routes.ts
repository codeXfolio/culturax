import { Router } from 'express';
import AiController from '../modules/ai/ai.controller';
import { RouteConfig } from '../types/route.types';

const router = Router();
const aiController = new AiController();

const routes: RouteConfig[] = [
  {
    path: '/generate-caption',
    method: 'post',
    handler: aiController.generateCaption,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
