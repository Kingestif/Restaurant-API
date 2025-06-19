import { UserEntity } from "../entity/user";
import { UserRepository } from "../repository/userRepository";
import { UserValidationType } from "../validation/userValidation";
import bcrypt from 'bcrypt';


export const signupService = async ({ email, password, role }: UserValidationType) => {
    const userRepository = new UserRepository();

    const existingUser = await userRepository.findByEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const userEntity = new UserEntity(email, hashedPassword, role);
    const user = await userRepository.save(userEntity);
    return user;
}