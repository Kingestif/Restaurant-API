import User from '../models/users';
import { Request, Response } from 'express';

export const viewAllUsers = async(req:Request, res:Response) => {
    try{
        const user = await User.find();

        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: user
        });
    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}

export const viewUserProfile = async(req:Request, res:Response) => {
    try{
        const user = await User.findById(req.params.id);

        return res.status(200).json({
            status: "success",
            message: "Users profile fetched successfully",
            data: user
        });
    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}


export const updateUserRole = async(req:Request, res:Response) => {
    try{
        const updateData = req.body;
        
        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            status: "success",
            message: "Users profile updated successfully",
            data: user
        });

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}


export const deleteUser = async(req:Request, res:Response) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(204).json();

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}