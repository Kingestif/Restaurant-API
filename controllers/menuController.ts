import {NextFunction, Request, Response} from 'express';
import { MenuService } from '../services/menu/menuServices';
import { MenuRepository } from '../repository/menuRepository';
import { updateValidation, menuValidation } from '../validation/menuValidation';
import { AppError } from '../utils/AppError';

export const getMenu = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const menuRepository = new MenuRepository();
        const menuService = new MenuService(menuRepository);
        
        const menu = await menuService.getMenu();

        return res.status(200).json({
            status: 'success',
            message: "Successfuly fetched all menus",
            data: menu || []
        });

    }catch(error){
        next(error);
    }
}

export const postMenu = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const menuRepository = new MenuRepository();
        const menuService = new MenuService(menuRepository);

        const menu = menuValidation.parse(req.body);
        const newMenu = await menuService.postMenu(menu);

        return res.status(201).json({
            status: 'success',
            message: "Successfuly created new menu",
            newMenu
        });

    }catch(error){
        next(error);
    }
}

export const editMenu = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const menuRepository = new MenuRepository();
        const menuService = new MenuService(menuRepository);

        // const onlyUpdate = menuValidation.partial();    //allow to send only part of data that gets updated
        // const updateData = onlyUpdate.parse(req.body);        //validate only fields sent ubove
        const updateData = updateValidation.parse(req.body);
        
        const id = req.params.id;
        if(!id) throw new AppError('Id is required field', 400);

        const updatedMenu = await menuService.editMenu(id, updateData);

        return res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            updatedMenu
        });

    }catch(error){
        console.log(error);
        next(error);
    }
}

export const deleteMenu = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const menuRepository = new MenuRepository();
        const menuService = new MenuService(menuRepository);
        
        const id = req.params.id;
        if(!id) throw new AppError('Id is required field', 400);

        await menuService.deleteMenu(id);
        return res.status(204).json();
        
    }catch(error){
        next(error);
    }
}