import { Role } from "@prisma/client";
import { toUser } from "../mapper/toUserType";
import User from "../models/users";
import prisma from "../prisma";
import { Usertype } from "../types/user";
import { AppError } from "../utils/AppError";

export interface IUserRepository {
    find(): Promise<Usertype[]>;
    findById(id:string): Promise<Usertype | null>;
    findByIdAndUpdate(id: string, role: string): Promise<Usertype>;
    findByIdAndDelete(id: string): Promise<null>;
}

export class UserRepositoryMongo implements IUserRepository{
    async find(): Promise<Usertype[]>{
        const users = await User.find();
        return users.map((user: any)=> toUser(user));
    }

    async findById(id: string): Promise<Usertype | null> {
        const user = await User.findById(id);
        if(!user) throw new AppError('user could not be found', 404);
        return toUser(user);
    }

    async findByIdAndUpdate(id: string, role: string): Promise<Usertype> {
        const user = await User.findByIdAndUpdate(id, { role }, {
            new: true,
            runValidators: true
        });
        return toUser(user);
    }

    async findByIdAndDelete(id: string): Promise<null> {
        await User.findByIdAndDelete(id);
        return null;   
    }
}

export class UserRepositoryPrisma implements IUserRepository{
    async find(): Promise<Usertype[]>{
        const users = await prisma.user.findMany();
        return users.map((user: any)=> toUser(user));
    }

    async findById(id: string): Promise<Usertype | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!user) throw new AppError('user could not be found', 404);

        return toUser(user);
    }

    async findByIdAndUpdate(id: string, role: string): Promise<Usertype> {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                role: role as Role
            }
        });
        return toUser(user);
    }

    async findByIdAndDelete(id: string): Promise<null> {
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        return null;   
    }
}