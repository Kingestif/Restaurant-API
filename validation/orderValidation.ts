import {z} from 'zod';

const itemValidation = z.object({
    product: z.string().min(1, 'product id is required field'),
    quantity: z.number().min(1, 'quantity is required field'),
});

const itemArrayValidation = z.array(itemValidation);

export const orderValidation = z.object({
    items: itemArrayValidation
});