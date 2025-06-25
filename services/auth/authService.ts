import { UserDTO } from "../../dto/userDTO";
import { HashRepository } from "../../repository/hashRepository";
import { TokenRepository } from "../../repository/tokenRepository";
import { IUserRepository, UserRepository } from "../../repository/userRepository";
import { Usertype } from "../../types/user";
import { SignInValidationType } from "../../validation/signinValidation";
import { signUpValidationType } from "../../validation/signupValidation";

export class AuthenticationService {
    private userRepository: IUserRepository;
    private hashRepository: HashRepository;
    private tokenRepository: TokenRepository;

    constructor(userRepository: IUserRepository, hashRepository: HashRepository, tokenRepository: TokenRepository) {
        this.userRepository = userRepository;
        this.hashRepository = hashRepository;
        this.tokenRepository = tokenRepository;
    }

    async signUp({ email, password, role }: signUpValidationType) {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User with this email already exists");
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

        if (!existingUser) {
            throw new Error('Incorrect email or password');
        }
        console.log("existingUser", existingUser, existingUser.password);

        if (!await this.hashRepository.compare(password, existingUser.password)){
            throw new Error('Incorrect email or password');
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