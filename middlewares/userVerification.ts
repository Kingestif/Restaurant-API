import User from '../models/users';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import {IUser} from '../models/users';
import {Request, Response, NextFunction} from 'express';

export const protect = async(req:Request, res:Response, next: NextFunction) =>{       
    let token = '';
    try{
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){   
            token = req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            res.status(401).json({
                status: "error",
                message:"Please login to get access!"
            });
            return;
        }

        const JWT_SECRET= process.env.JWT_SECRET!;
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const decoded = jwt.verify(token, JWT_SECRET) as any;    

        const isalive = await User.findById(decoded.id);

        if(!isalive){       
            res.status(401).json({
                status: "error",
                message:"User no longer exist!"
            });
            return;
        }

        req.user = isalive as IUser;   //refer types folder, must add that file to tsconfig.json typeRoots attribute
        next();

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(401).json({
            status: "error",
            message: message
        });
        return;
    }

}

export const isCustomer = (req:Request, res:Response, next: NextFunction) =>{
    //since we already checked req.user is right on "protect" middleware we add (!) if there was no "protect" we check if(!req.user)... 
    if(req.user!.role !== 'customer'){
        res.status(403).json({
            status: "error",
            message: "You must be a Customer to this operation",
        });
        return;
    }
    next();
}

export const isAdmin = (req:Request, res:Response, next: NextFunction) =>{
    if(req.user!.role !== 'admin'){
        res.status(403).json({
            status: "error",
            message: "You must be an Admin to do this operation",
        });
        return;
    }
    next();
}

export const isManager = (req:Request, res:Response, next: NextFunction) =>{
    if(req.user!.role !== 'manager'){
        res.status(403).json({
            status: "error",
            message: "You must be a Manager to do this operation",
        });
        return;
    }
    next();
}

