import { IUserRepository } from "../../repository/userRepository";

export class UserService {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    async viewAllUsers(){
        const user = await this.userRepository.find();
        return user;
    }

    async viewUserProfile(id: string) {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async updateUserRole(id: string, role: string) {
        const user = await this.userRepository.findByIdAndUpdate(id, role);
        return user;
    }

    async deleteUser(id: string) {
        return await this.userRepository.findByIdAndDelete(id);
    }
}