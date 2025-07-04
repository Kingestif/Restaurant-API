export type BookingType = {
    id: string;
    date: Date;
    time: string;
    numberOfPeople: number;
    customer?: {             //this part is only needed during populating our database
        id: string,
        email: string
    }
}