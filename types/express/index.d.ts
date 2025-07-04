import { ObjectId } from 'mongoose';
import { IUser } from '../../models/users'; 
import { Roles } from '../roles';

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

// USE!!
// By default, Express's Request type does not have a user property.
// this means req.user will not work (on our middleware)
// so i declared global block to merge my custom user property into the global Express Request type.
// now i can use req.user anywhere