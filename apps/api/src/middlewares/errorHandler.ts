import { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
   status?: number;
}

export const errorHandler = (
   err: AppError,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const status = err.status || 500;
   const message = err.message || "Internal Server Error";
   console.error(err);
   res.status(status).json({
      message,
   });
};
