import {z} from 'zod';

const bookingValidation  = z.object({
    date: z.coerce.date(),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Time must be in HH:mm 24-hour format"
    }),    
    numberOfPeople: z.number().min(1, "Must reserve for atleast 1 individual")
});

export default bookingValidation;

export type bookingValidationType = z.infer<typeof bookingValidation>;