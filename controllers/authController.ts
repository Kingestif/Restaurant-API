import User from '../models/users';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserEntity } from '../entity/user';
import { UserRepository } from '../repository/userRepository';
import userValidation from '../validation/userValidation';
import bcrypt from 'bcrypt';
import { signupService } from '../services/authService';

//controllers only concerned with getting request and sending response and validation
export const signup = async (email: string, password: string, role: string) => {

    try {
        const input = userValidation.parse({ email, password, role });

        const user = await signupService(input)

        return user;

    } catch (error: unknown) {
        let message = "An unknown error occured";
        if (error instanceof Error) {
            message = error.message;
        }

        throw new Error(message);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            res.status(401).json({
                status: "error",
                message: "Please Provide email and password",
            });
            return;
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !await user.checkPassword(password)) {
            res.status(500).json({
                status: "error",
                message: "Incorrect email or password",
            });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET!;
        const JWT_EXPIRE = Number(process.env.JWT_EXPIRE)

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE ?? ""
        });

        await user.save();

        res.status(200).json({
            status: "success",
            token: token,
            role: user.role
        });

    } catch (error) {
        let message = "An unknown error happend";
        if (error instanceof Error) {
            message = error.message;
        }

        res.status(500).json({
            status: "error",
            message: message
        });
    }
}