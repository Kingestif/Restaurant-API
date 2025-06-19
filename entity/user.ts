export class UserEntity{
    constructor(
        public email: string,
        private password: string,
        public role: string,
    ) {
        //optional since we added zod validation layer 
        email = email.toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        if(!['customer', 'manager', 'admin'].includes(role)){
            throw new Error("Role must be one of 'customer', 'manager', or 'admin'");
        }
    }

    getPassword(): string{
        return this.password;
    }
}
