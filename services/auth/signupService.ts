import { UserDTO } from "../../dto/userDTO";
import { UserEntity } from "../../entity/user";
import { HashRepository } from "../../repository/hashRepository";
import { IUserRepository, UserRepository } from "../../repository/userRepository";
import { UserValidationType } from "../../validation/userValidation";
// import { SignupDeps } from "./authServiceDeps";

// OLD WAY without class#1   

// export const signupService = async (deps: SignupDeps, { email, password, role }: UserValidationType) => {
//     const { userRepository, UserEntity, hashRepository } = deps;

//     const existingUser = await userRepository.findByEmail(email);

//     if (existingUser) {
//         throw new Error("User with this email already exists");
//     }

//     const hashedPassword = await hashRepository.hash(password, 12);
//     const userEntity = new UserEntity(email, hashedPassword, role);
//     const user = await userRepository.save(userEntity);

//     return new UserDTO(user);       //instead of just saying return user, we return a DTO that does not include password field
// }

export class AuthenticationService {
    private userRepository: IUserRepository
    private hashRepository: HashRepository

    constructor(userRepository: IUserRepository, hashRepository: HashRepository,) {
        this.userRepository = userRepository
        this.hashRepository = hashRepository
    }

    async signUp({ email, password, role }: UserValidationType) {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await this.hashRepository.hash(password, 12);

        const userEntity = new UserEntity(email, hashedPassword, role);
        const user = await this.userRepository.save(userEntity);

        return new UserDTO(user);
    }
}