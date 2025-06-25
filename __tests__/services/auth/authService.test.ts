import { AuthenticationService } from "../../../services/auth/authService";
import { Usertype } from "../../../types/user";

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
            },

            tokenRepository: {
                generateToken: jest.fn(),
                // verifyToken: jest.fn(),
            }
        }
        const authService = new AuthenticationService(deps);

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
                findByEmail: jest.fn().mockResolvedValue(null), // null means users doesn't exist
                save: async (user: Usertype) => {
                    return {
                        email: user.email,
                        password: user.password,
                        role: user.role
                    }
                }
            },

            hashRepository: {
                hash: jest.fn().mockResolvedValue("hashedPassword"),
                compare: jest.fn(),
            },

            tokenRepository: {
                generateToken: jest.fn(),
                // verifyToken: jest.fn(),
            }
        }

        const authService = new AuthenticationService(deps);

        const result = await authService.signUp(input);

        //we test if our DTO is working by checking password is not returned
        expect(result).toEqual({        
            email: "fakeuser@example.com",
            role: "admin"
        });

        // TIP: read it like "if input was this, then our user repo findbyemail return null(no duplicate), if .save returns the user, if we pass real UserEntity, if hash return hashedPass then will the result be same as we exptected"
    });

    it('throws an error if email is not found during login', async () => {
        const deps = {
            userRepository: {   
                findByEmail: jest.fn().mockResolvedValue(null),  
                save: jest.fn(),
            },
            hashRepository: {
                hash: jest.fn(),
                compare: jest.fn(),
            },

            tokenRepository: {
                generateToken: jest.fn(),
            }
        }

        const input = {
            email: "user@example.com",
            password: "password123"
        }

        const authService = new AuthenticationService(deps);

        await expect(authService.signIn(input)).rejects.toThrow("Incorrect email or password");
    });

    it("throws an error if compared password don't match", async () => {

        const input = {
            email: "user@example.com",
            password: "password123"
        }

        const deps = {
            userRepository: {
                findByEmail: jest.fn().mockResolvedValue({email: "user@example.com"}),
                save: jest.fn()
            },

            hashRepository: {
                hash: jest.fn(),
                compare: jest.fn().mockResolvedValue(false)
            },

            tokenRepository: {
                generateToken: jest.fn().mockResolvedValue("tokenString")
            }
        }

        const authService = new AuthenticationService(deps);

        await expect(authService.signIn(input)).rejects.toThrow("Incorrect email or password");
    });
})