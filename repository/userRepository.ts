import { UserEntity } from "../entity/user";
import User from '../models/users';

// This interface describes what our repository must do, but not how. 
// My business logic (service/use case) will depend on this interface.
export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
}


// This class implements the IUserRepository interface, providing methods to interact with the user data.
export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await User.findOne({ email });

        if(!user) return null;
        
        return new UserEntity(user.email, user.password, user.role);
    }
    
    async save(userEntity: UserEntity): Promise<UserEntity> {
        try {
            const user = new User({
                email: userEntity.email,
                password: userEntity.getPassword(),
                role: userEntity.role
            });

            const saved = await user.save();
            return new UserEntity(saved.email, saved.password, saved.role);

        } catch (error) {
            let message = "An unknown error occurred";
            if (error instanceof Error) {
                message = error.message;
            }
            throw new Error(message);
        }
    }
}