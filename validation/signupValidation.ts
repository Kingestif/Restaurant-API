import {z} from 'zod';

const signupValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['customer', 'admin', 'manager'], {
    message: 'Role must be one of customer, admin, or manager'
  })
}); 

export type signUpValidationType = z.infer<typeof signupValidation>;  //we can then use this as a type

export default signupValidation;