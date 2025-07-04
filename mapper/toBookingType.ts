import { BookingType } from "../types/booking"

// we can convert monogodb object to plain js type
export const toBookingType = (doc: any): BookingType => {
    return {
        id: doc._id.toString(),
        date: doc.date,
        time: doc.time,
        numberOfPeople: doc.numberOfPeople,
        customer: {             //this part is only needed during populating our database
            id: doc.customer._id,
            email: doc.customer.email
        }
    }
}
