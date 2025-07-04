import { toUser } from "../mapper/toUserType";
import User from "../models/users";
import { Usertype } from "../types/user";

export interface IUserRepository {
    find(): Promise<Usertype[]>;
    findById(id:string): Promise<Usertype>;
    findByIdAndUpdate(id: string, role: string): Promise<Usertype>;
    findByIdAndDelete(id: string): Promise<null>;
}

export class UserRepository implements IUserRepository{
    async find(): Promise<Usertype[]>{
        const users = await User.find();
        return users.map((user: any)=> toUser(user));
    }

    async findById(id: string): Promise<Usertype> {
        const user = await User.findById(id);
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