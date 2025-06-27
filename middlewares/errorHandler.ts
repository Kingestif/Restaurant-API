import { Request, Response, NextFunction} from "express";
import { AppError } from "../utils/AppError";
import { config } from "../config/config";

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError? err.statusCode : 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message,
        stack: config.NODE_ENV === 'development' ? err.stack : undefined
        //shows where the error happened in development mode
    });
}