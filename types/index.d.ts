import { ObjectId } from 'mongoose';
import { IUser } from '../models/users'; 
import { Roles } from './roles';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id:string,
        role:Roles
      };
    }
  }
}
