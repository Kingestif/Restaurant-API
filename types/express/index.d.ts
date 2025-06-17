import { IUser } from '../../models/users'; 

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
