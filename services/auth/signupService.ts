import { UserValidationType } from "../../validation/userValidation";
import {SignupDeps} from "./authServiceDeps";

export const signupService = async (deps: SignupDeps, { email, password, role }: UserValidationType) => {
    const {userRepository, UserEntity, hashRepository} = deps;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    
    const hashedPassword = await hashRepository.hash(password, 12);
    const userEntity = new UserEntity(email, hashedPassword, role);
    const user = await userRepository.save(userEntity);
    return user;
}