import { BookingType } from "../types/booking"

// we can convert monogodb object to plain js type
export const toBookingType = (doc: any): BookingType => {
    return {
        id: (doc._id ?? doc.id)?.toString(),    //?? (Nullish Coalescing Operator) return value of left if its for mongo otherwise do for SQL id's
        date: doc.date,
        time: doc.time,
        numberOfPeople: doc.numberOfPeople,
        customer: doc.customer? {             //this part is only needed during populating our database
            id: (doc.customer._id ?? doc.customer.id)?.toString(),
            email: doc.customer.email
        }: undefined
    }
}
