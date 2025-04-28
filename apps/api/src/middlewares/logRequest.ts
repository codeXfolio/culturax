import { Request, Response, NextFunction } from 'express';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  // Only log in development environment
  if (process.env.NODE_ENV === 'development') {
    if (!req.url.includes('/docs')) {
      console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    }
  }
  next();
};

export default logRequest;
