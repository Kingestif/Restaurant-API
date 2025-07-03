import {z} from 'zod';

export const idValidation = z.string().min(1, 'id is a required field');
export const roleValidation = z.enum(['customer', 'admin', 'manager'], {
    errorMap: () => ({ message: 'Role must be one of customer, admin, or manager' })
});