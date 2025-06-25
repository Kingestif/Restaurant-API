import {z} from 'zod';

const signInValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
}); 

export type SignInValidationType = z.infer<typeof signInValidation>;  

export default signInValidation;