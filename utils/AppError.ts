export class AppError extends Error {
    public statusCode: number;
    
    constructor(message: string, statusCode: number, ){
        super(message);     //calls built in Error's constructor
        this.statusCode = statusCode;
    }
}