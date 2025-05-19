import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import FeedController from '../modules/feed/feed.controller';
import { RouteConfig } from '../types/route.types';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/feed',
});

const router = Router();
const feedController = new FeedController();

const routes: RouteConfig[] = [
  {
    path: '/',
    method: 'get',
    handler: feedController.getAll,
  },
  {
    path: '/create',
    method: 'post',
    handler: feedController.create,
    middlewares: [upload.single('image')],
  },
  {
    path: '/:id',
    method: 'delete',
    handler: feedController.delete,
  },
  {
    path: '/comment',
    method: 'post',
    handler: feedController.createComment,
  },
  {
    path: '/comment/:id',
    method: 'delete',
    handler: feedController.deleteComment,
  },
  {
    path: '/like',
    method: 'post',
    handler: feedController.like,
  },
  {
    path: '/unlike',
    method: 'post',
    handler: feedController.unlike,
  },
  {
    path: '/:feedPostId/likes',
    method: 'get',
    handler: feedController.getLikes,
  },
  {
    path: '/:feedPostId/comments',
    method: 'get',
    handler: feedController.getComments,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
