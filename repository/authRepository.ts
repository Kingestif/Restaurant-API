import User from '../models/users';
import { Usertype } from "../types/user";

// This interface describes what our repository must do, but not how. 
// My business logic (service/use case) will depend on this interface.
export interface IAuthRepository {
    findByEmail(email: string): Promise<Usertype | null>;
    save(user: Usertype): Promise<Usertype>;
}


// This class implements the IUserRepository interface, providing methods to interact with the user data.
export class AuthRepository implements IAuthRepository {
    async findByEmail(email: string): Promise<Usertype | null> {
        const user = await User.findOne({ email });

        if(!user) return null;
        
        return {
            email: user.email,
            password: user.password,
            role: user.role
        }
    }
    
    async save(user: Usertype): Promise<Usertype> {
        const userDoc = new User({
            email: user.email,
            password: user.password,
            role: user.role
        });

        const saved = await userDoc.save();

        // return {         
        //     email: saved.email,
        //     password: saved.password,
        //     role: saved.role
        // }

        //as our model grows returning instead of returning all fields like above we can dynamically return using object destructuring like below
        return {...saved.toObject()} as Usertype;
    }
}