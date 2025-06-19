import User from '../models/users';
import { UserEntity } from '../entity/user';

export class UserRepository {
    async findByEmail(email: string) {
        return User.findOne({ email });
    }
    
    async save(userEntity: UserEntity) {
        try {
            const user = new User({
                email: userEntity.email,
                password: userEntity.getPassword(),
                role: userEntity.role
            });
            return await user.save();

        } catch (error) {
            let message = "An unknown error occurred";
            if (error instanceof Error) {
                message = error.message;
            }
            throw new Error(message);
        }
    }
}