import { NextFunction, Request, Response } from 'express';
import signupValidation from '../validation/signupValidation';
import { AuthenticationService } from '../services/auth/authService';
import { BcryptHashRepository } from '../repository/hashRepository';
import { AuthRepository } from '../repository/authRepository';
import signInValidation from '../validation/signinValidation';
import { JwtTokenRepository } from '../repository/tokenRepository';
import { config } from '../config/config';

const AuthDeps = () => {        //This function returns an object containing the dependencies needed by the AuthenticationService
    return {
        userRepository: new AuthRepository(),  
        hashRepository: new BcryptHashRepository(),
        tokenRepository: new JwtTokenRepository(
            config.JWT_SECRET,      
            Number(config.JWT_EXPIRE) 
        )
    }
};

//controllers are only concerned with getting request, validating, calling the right service & sending response back
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = signupValidation.parse(req.body);
        const authenticationService = new AuthenticationService(AuthDeps());        //•Initializing the service then •Injecting the dependencies 
        
        // const user = await signupService(deps, input);   //without class #1 old way
        const user = await authenticationService.signUp(input); 

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user
        });

    } catch (error: unknown) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const input = signInValidation.parse(req.body);

        const authenticationService = new AuthenticationService(AuthDeps());
        const token = await authenticationService.signIn(input);

        res.status(200).json({
            status: "successfully logged in",
            token: token,
        });

    } catch (error) {
        next(error);
    }
}