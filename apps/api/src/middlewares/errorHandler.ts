import { Request, Response, NextFunction } from 'express';

// Define custom error type (optional but recommended)
interface CustomError extends Error {
  status?: number;
  code?: string;
}

// Error handler middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(
    `Error: ${err.message?.split('.')[0]?.substring(0, 100)} at ${err.stack?.split('\n')[1]?.trim()}`,
  );

  const statusCode = err.status || 500;
  // Truncate error message to first 100 characters or until first period
  const message = (err.message || 'Internal Server Error')
    .split('.')[0]
    .substring(0, 100);

  res.status(statusCode).json({
    success: false,
    message,
    // Optional: include stack trace only in development
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack?.split('\n')[1]?.trim(),
    }),
  });
};

export default errorHandler;
