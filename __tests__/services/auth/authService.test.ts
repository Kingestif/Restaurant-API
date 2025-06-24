import { AuthenticationService } from "../../../services/auth/authService";

describe("signupServie", () => {
    it("throws error if user with email exists", async () => {
        const input = {
            email: "fakeuser@example.com",
            password: "plainPass",
            role: "admin" as "admin"
        }
        const deps = {
            userRepository: {   
                // *returns promise that resolves to an existing user (pretending the database found an existing user.)
                findByEmail: jest.fn().mockResolvedValue({ email: "exists@example.com" }),  
                save: jest.fn(),
            },
            hashRepository: {
                hash: jest.fn(),
                compare: jest.fn(),
            }
        }
        const authService = new AuthenticationService(deps.userRepository, deps.hashRepository);

        await expect(authService.signUp(input)).rejects.toThrow("User with this email already exists");
    });

    it("correctly hashes, creates user and returns without password", async () => {
        const input = {
            email: "fakeuser@example.com",
            password: "plainPass",
            role: "admin" as const
        }
        
        const deps = {
            userRepository: {
                findByEmail: jest.fn().mockResolvedValue(null), // OR async ()=> null, just means users doesn't exist
                save: async (user: any) => {
                    return {
                        email: user.email,
                        password: user.password,
                        role: user.role
                    }
                }
            },

            hashRepository: {
                hash: async()=> "hashedPass",
                compare: async()=> true,
            }
        }

        const authService = new AuthenticationService(deps.userRepository, deps.hashRepository);

        const result = await authService.signUp(input);

        //we test if our DTO is working by checking password is not returned
        expect(result).toEqual({        
            email: "fakeuser@example.com",
            role: "admin"
        });

        // TIP: read it like "if input was this, then our user repo findbyemail return null(no duplicate), if .save returns the user, if we pass real UserEntity, if hash return hashedPass then will the result be same as we exptected"
    });
})