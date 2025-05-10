import { Router } from 'express';
import BlockchainController from '../modules/blockchain/blockchain.controller';
import { RouteConfig } from '../types/route.types';

const router = Router();
const blockchainController = new BlockchainController();

const routes: RouteConfig[] = [
  {
    path: '/balances',
    method: 'post',
    handler: blockchainController.getBalances.bind(blockchainController),
  },
];

// Register routes
routes.forEach(({ path, method, handler, middlewares = [] }) => {
  router[method](path, ...middlewares, handler);
});

export default router;
