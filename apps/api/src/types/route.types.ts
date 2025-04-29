import { Request, Response, NextFunction } from 'express';

export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any> | void;

export interface RouteConfig {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  handler: RouteHandler;
  middlewares?: RouteHandler[];
}
