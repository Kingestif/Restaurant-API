import { UserRepository } from "../../../repository/userRepository";
import { UserService } from "../../../services/user/userService";

describe('userService', ()=> {
    let userRepository: jest.Mocked<UserRepository>;
    let userService: UserService;

    let id: string;
    let role: string;

    let user: {
        id: string,
        email: string,
        role: string
    }

    beforeEach(()=> {
        id = 'userID123';
        role = 'admin';

        user = {
            id: 'userID123',
            email: 'user@example.com',
            role: 'admin'
        }

        userRepository = {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn()
        } as unknown as jest.Mocked<UserRepository>

        userService = new UserService(userRepository);
    });

    it('correctly returns all users', async ()=> {
        userRepository.find.mockResolvedValue([user]);
        const result = await userService.viewAllUsers();
        expect(result).toEqual([user]);
    });

    it('correctly returns users profile', async()=> {
        userRepository.findById.mockResolvedValue(user);
        const result = await userService.viewUserProfile(id);
        expect(result).toEqual(user);
    });

    it('correctly updates a user and returns the result', async()=> {
        userRepository.findByIdAndUpdate.mockResolvedValue(user);
        const result = await userService.updateUserRole(id, role);
        expect(result).toEqual(user);
    });

    it('correctly deletes a user', async ()=> {
        userRepository.findByIdAndDelete.mockResolvedValue(null);
        const result = await userService.deleteUser(id);
        expect (result).toEqual(null);
    });
});