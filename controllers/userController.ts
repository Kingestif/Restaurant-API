import { NextFunction, Request, Response } from 'express';
import { UserRepositoryMongo, UserRepositoryPrisma } from '../repository/userRepository';
import { UserService } from '../services/user/userService';
import { idValidation, roleValidation} from '../validation/userValidation';

export const viewAllUsers = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const userRepository = new UserRepositoryPrisma();
        const userService = new UserService(userRepository);

        const user = await userService.viewAllUsers();

        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: user
        });
        return;
    }catch(error){
        next(error);
    }
}

export const viewUserProfile = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const userRepository = new UserRepositoryPrisma();
        const userService = new UserService(userRepository);

        const id = idValidation.parse(req.params.id);
        const user = await userService.viewUserProfile(id);

        res.status(200).json({
            status: "success",
            message: "Users profile fetched successfully",
            data: user
        });
        return;
    }catch(error){
        next(error);
    }
}


export const updateUserRole = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const userRepository = new UserRepositoryPrisma();
        const userService = new UserService(userRepository);

        const id = idValidation.parse(req.params.id);
        const role = roleValidation.parse(req.body.role);
        
        const user = await userService.updateUserRole(id, role);

        res.status(200).json({
            status: "success",
            message: "Users profile updated successfully",
            data: user
        });
        return;

    }catch(error){
        next(error);
    }
}


export const deleteUser = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const userRepository = new UserRepositoryPrisma();
        const userService = new UserService(userRepository);

        const id = idValidation.parse(req.params.id);

        await userService.deleteUser(id);

        res.status(204).json();
        return;

    }catch(error){
        next(error);
    }
}