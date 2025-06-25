import User from '../models/users';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import signupValidation from '../validation/signupValidation';
import { AuthenticationService } from '../services/auth/authService';
import { BcryptHashRepository } from '../repository/hashRepository';
import { UserRepository } from '../repository/userRepository';
import signInValidation from '../validation/signinValidation';
import { JwtTokenRepository } from '../repository/tokenRepository';

//controllers only concerned with getting request, validating, calling the right service & sending response back
export const signup = async (req: Request, res: Response) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_EXPIRE = Number(process.env.JWT_EXPIRE);

        if(!JWT_SECRET || !JWT_EXPIRE) {
            throw new Error("JWT_SECRET or JWT_EXPIRE environment variable is not set");
        }   
        
        const deps = {
            userRepository: new UserRepository(),   //(those initalized on serviceDeps), we used to do this on service layer but on clean architecture we initialize them here
            hashRepository: new BcryptHashRepository(),
            tokenRepository: new JwtTokenRepository(JWT_SECRET, JWT_EXPIRE)
        };

        const input = signupValidation.parse(req.body);
        const authenticationService = new AuthenticationService(deps.userRepository, deps.hashRepository, deps.tokenRepository);
        
        // const user = await signupService(deps, input);   //without class #1
        const user = await authenticationService.signUp(input)

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user
        });

    } catch (error: unknown) {
        let message = "An unknown error occurred";
        if (error instanceof Error) {
            message = error.message;
        }

        res.status(500).json({
            status: 'error',
            message: message
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_EXPIRE = Number(process.env.JWT_EXPIRE);

        if(!JWT_SECRET || !JWT_EXPIRE) {
            throw new Error("JWT_SECRET or JWT_EXPIRE environment variable is not set");
        }   
        
        const deps = {
            userRepository: new UserRepository(),  
            hashRepository: new BcryptHashRepository(),
            tokenRepository: new JwtTokenRepository(JWT_SECRET, JWT_EXPIRE)     //* instead of passing JWT_SECRET and JWT_EXPIRE to service, we pass it to the tokenRepository to initialize it then whenever our service calls the generateToken method, it will use the secret and expire time from the tokenRepository
        };

        const input = signInValidation.parse(req.body);

        const authenticationService = new AuthenticationService(deps.userRepository, deps.hashRepository, deps.tokenRepository);
        const token = await authenticationService.signIn(input);

        res.status(200).json({
            status: "successfully logged in",
            token: token,
        });

    } catch (error) {
        let message = "An unknown error happend";
        if (error instanceof Error) {
            message = error.message;
        }
        console.log(message);

        res.status(500).json({
            status: "error",
            message: message
        });
    }
}