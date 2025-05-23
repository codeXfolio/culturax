import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import CollectionController from '../modules/collection/collection.controller';
import { RouteConfig } from '../types/route.types';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/collections',
});

const router = Router();
const collectionController = new CollectionController();

const routes: RouteConfig[] = [
  {
    path: '/upload',
    method: 'post',
    handler: collectionController.upload,
    middlewares: [
      upload.fields([
        { name: 'images', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
      ]),
    ],
  },
  {
    path: '/user/:userId',
    method: 'get',
    handler: collectionController.getByUser,
  },
  {
    path: '/username/:username',
    method: 'get',
    handler: collectionController.getByUsername,
  },
  {
    path: '/:id',
    method: 'get',
    handler: collectionController.getById,
  },
  {
    path: '/update/:id',
    method: 'put',
    handler: collectionController.update,
  },
  {
    path: '/delete/:id',
    method: 'delete',
    handler: collectionController.delete,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
