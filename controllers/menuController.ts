import Menu from '../models/menu';
import {Request, Response} from 'express';

export const getMenu = async(req:Request, res:Response) => {
    try{
        const menu = await Menu.find();
        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched all menus",
            data: menu || []
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

export const postMenu = async(req:Request, res:Response) => {
    try{
        const {name, description, price, category, available} = req.body;
        if (!name || price == null) {
            return res.status(400).json({
                status: "fail",
                message: "Name and price are required fields"
            });
        }

        const newMenu = await Menu.create({name, description, price, category, available});

        
        return res.status(201).json({
            status: "success",
            message: "Successfuly created new menu",
            menu: newMenu
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

export const editMenu = async(req:Request, res:Response) => {
    try{
        const updateData = req.body;

        const menu = await Menu.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            status: "success",
            message: "Menu updated successfully",
            data: menu
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

export const deleteMenu = async(req:Request, res:Response) => {
    try{
        await Menu.findByIdAndDelete(req.params.id);
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