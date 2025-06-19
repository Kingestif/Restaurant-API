import {z} from 'zod';

const userValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['customer', 'admin', 'manager'], {
    message: 'Role must be one of customer, admin, or manager'
  })
}); 

export type UserValidationType = z.infer<typeof userValidation>;  //we can then use this as a type

export default userValidation;