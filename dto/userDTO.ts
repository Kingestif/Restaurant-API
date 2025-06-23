// A DTO(data transfer object) is a plain object that defines what data you send or receive between layers (like between service and controller, or controller and frontend).
// for ex we dont want to send password to the frontend, so we define a DTO that does not include password field

export class UserDTO{
    email: string;
    role: string;

    constructor(user: {email: string, role: string}) {
        this.email = user.email;
        this.role = user.role;
    }
}

