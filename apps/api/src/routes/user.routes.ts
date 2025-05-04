import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import UserController from '../modules/user/user.controller';
import { RouteConfig } from '../types/route.types';

const upload = multer({
  storage: memoryStorage(),
  dest: 'uploads/avatars',
});

const router = Router();
const userController = new UserController();

const routes: RouteConfig[] = [
  {
    path: '/register',
    method: 'post',
    handler: userController.register,
    middlewares: [upload.single('avatar')],
  },
  {
    path: '/:address',
    method: 'get',
    handler: userController.getUser,
  },
  {
    path: '/follow',
    method: 'post',
    handler: userController.follow,
  },
  {
    path: '/:address',
    method: 'patch',
    handler: userController.update,
  },
  {
    path: '/:userId/followers',
    method: 'get',
    handler: userController.getFollowers,
  },
  {
    path: '/:userId/following',
    method: 'get',
    handler: userController.getFollowing,
  },
  {
    path: '/:userId/cover',
    method: 'patch',
    handler: userController.updateCoverImage,
    middlewares: [upload.single('coverImage')],
  },
  {
    path: '/:userId/profile',
    method: 'get',
    handler: userController.getUserProfile,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
