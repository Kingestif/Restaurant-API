import {z} from 'zod';

const bookingValidation  = z.object({
    date: z.coerce.date(),
    time: z.coerce.string()
});

export default bookingValidation;