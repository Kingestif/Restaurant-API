import { UserDTO } from "../../dto/userDTO";
import { HashRepository } from "../../repository/hashRepository";
import { TokenRepository } from "../../repository/tokenRepository";
import { IAuthRepository } from "../../repository/authRepository";
import { Usertype } from "../../types/user";
import { AppError } from "../../utils/AppError";
import { SignInValidationType } from "../../validation/signinValidation";
import { signUpValidationType } from "../../validation/signupValidation";
import { AuthServiceDeps } from "./authServiceDeps";

export class AuthenticationService {
    private userRepository: IAuthRepository;
    private hashRepository: HashRepository;
    private tokenRepository: TokenRepository;

    constructor(deps: AuthServiceDeps) {
        this.userRepository = deps.userRepository;
        this.hashRepository = deps.hashRepository;
        this.tokenRepository = deps.tokenRepository;
    }

    async signUp({ email, password, role }: signUpValidationType) {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError("User with this email already exists", 401);
        }

        const hashedPassword = await this.hashRepository.hash(password, 12);

        const user: Usertype = {
            email,
            password: hashedPassword,
            role
        }

        const savedUser = await this.userRepository.save(user);

        return new UserDTO(savedUser);
    }

    async signIn({ email, password }: SignInValidationType) {
        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser || !existingUser.password || !await this.hashRepository.compare(password, existingUser.password)){
            throw new AppError('Incorrect email or password', 401);
        }

        const token = this.tokenRepository.generateToken({email: existingUser.email});

        return token;
    }
}




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