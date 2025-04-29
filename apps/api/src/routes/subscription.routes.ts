import { Router } from 'express';
import SubscriptionController from '../modules/subscription/subscription.controller';
import { RouteConfig } from '../types/route.types';

const router = Router();
const subscriptionController = new SubscriptionController();

const routes: RouteConfig[] = [
  {
    path: '/create',
    method: 'post',
    handler: subscriptionController.create,
  },
  {
    path: '/user/:userId',
    method: 'get',
    handler: subscriptionController.getSubscriptions,
  },
  {
    path: '/monetization/settings',
    method: 'post',
    handler: subscriptionController.setMonetizationSettings,
  },
  {
    path: '/monetization/settings',
    method: 'put',
    handler: subscriptionController.editMonetizationSettings,
  },
  {
    path: '/monetization/settings/:userId',
    method: 'get',
    handler: subscriptionController.getMonetizationSettings,
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
