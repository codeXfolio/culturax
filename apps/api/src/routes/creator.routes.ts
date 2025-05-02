import { Router } from 'express';
import CreatorController from '../modules/creator/creator.controller';
import { RouteConfig } from '../types/route.types';

const router = Router();
const creatorController = new CreatorController();

const routes: RouteConfig[] = [
  {
    path: '/',
    method: 'get',
    handler: creatorController.getCreators,
  },
  {
    path: '/top',
    method: 'get',
    handler: creatorController.getTopCreators,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
