import User from '../models/users';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Roles } from '../types/roles';
import { config } from '../config/config';
import { AppError } from '../utils/AppError';
import prisma from '../prisma';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token = '';
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError('Please login to get access', 401);
        }

        const JWT_SECRET = config.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new AppError("JWT_SECRET environment variable is not set", 500);
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            throw new AppError('Invalid token payload', 401);
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            throw new AppError('User no longer exist', 400);
        }

        req.user = {
            id: user._id.toString(),
            role: user.role as Roles
        };   

        next();

    } catch (error) {
        next(error);
    }
}

export const protectPrisma = async (req: Request, res: Response, next: NextFunction) => {
    let token = '';
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AppError('Please login to get access', 401);
        }

        const JWT_SECRET = config.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new AppError("JWT_SECRET environment variable is not set", 500);
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            throw new AppError('Invalid token payload', 401);
        }

        // const user = await User.findOne({ email: decoded.email });
        const user = await prisma.user.findUnique({
            where: {
                email: decoded.email
            }
        });

        if (!user) {
            throw new AppError('User no longer exist', 400);
        }

        req.user = {
            id: user.id.toString(),
            role: user.role as Roles
        };   

        next();

    } catch (error) {
        next(error);
    }
}

export const checkRole =  (roles: Roles[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const currentUserRole = req?.user?.role;

        if (!currentUserRole) {
            throw new AppError('User role not found', 403);
        }

        if (!roles.includes(currentUserRole)) {
            throw new AppError('You are not authorized to do this operation', 403);
        }

        next();
    }
}