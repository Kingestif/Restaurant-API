import User from '../models/users';
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

export const signup = async(req:Request,res:Response)=>{
    
    try{
        const {email, password, role} = req.body;
        console.log(email);
        const newuser = await User.create({email, password, role});
        
        await newuser.save();

        const userObj = newuser.toObject();
        const { password: _password, ...userWithoutPassword } = userObj;

        res.status(201).json({
            status: 'success',
            user: userWithoutPassword
        });

    }catch(error:unknown){
        let message = "An unknown error occured";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(500).json({
            status: 'error',
            message: message
        });
    }
}

export const login = async(req:Request,res:Response) =>{
    try{
        const {email,password} = req.body;
        console.log(email, password);

        if(!email || !password){
            res.status(401).json({
                status: "error",
                message:"Please Provide email and password",
            });
            return;
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !await user.checkPassword(password)){
            res.status(500).json({
                status: "error",
                message:"Incorrect email or password",
            });
            return;
        }

        const JWT_SECRET= process.env.JWT_SECRET!;
        const JWT_EXPIRE =  Number(process.env.JWT_EXPIRE)
        
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {
            expiresIn: JWT_EXPIRE ?? "" 
        });

        await user.save();

        res.status(200).json({
            status: "success",
            token: token,
            role: user.role
        });

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(500).json({
            status: "error",
            message: message
        });
    }
}