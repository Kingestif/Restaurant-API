import { UserEntity } from "../entity/user";

export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
}

// This interface describes what our repository must do, but not how.
// Your business logic (service/use case) will depend on this interface.