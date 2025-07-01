import Booking from "../models/booking";
import { BookingType } from "../types/booking";
import { toBookingType } from "../mapper/toBookingType";

export interface IBookingRepository {
    findOne(id: string, date: Date, time: string): Promise<BookingType | null>,        //type might be booking validation type
    create(id: string, date: Date, time: string, numberOfPeople: number): Promise<BookingType>,
    find(id:string): Promise<BookingType[]>,
    findAll(): Promise<BookingType[]>
}

export class BookingRepository implements IBookingRepository {
    async findOne(id:string, date: Date, time: string): Promise<BookingType | null>{
        const existingBooking = await Booking.findOne({customer: id, date, time,});
        if(!existingBooking) return null;

        // return {
        //     id: existingBooking.id.toString(),
        //     date: existingBooking.date,
        //     time: existingBooking.time,
        //     numberOfPeople: existingBooking.numberOfPeople
        // }

        //instead of manually returning like above just converted the object to my ts type
        return toBookingType(existingBooking);
    }

    async create(id: string, date: Date, time: string, numberOfPeople: number): Promise<BookingType>{
        const newBooking = await Booking.create({customer: id, date, time, numberOfPeople });
        return toBookingType(newBooking);
    }

    async find(id: string): Promise<BookingType[]>{
        const myBookings = await Booking.find({customer: id}).populate('customer', 'email').sort({date: 1, time: 1});
        return myBookings.map((booking: any) => toBookingType(booking));
    }

    async findAll(): Promise<BookingType[]> {
        const bookings = await Booking.find().populate('customer', 'email').sort({date: 1, time: 1});
        return bookings.map((booking: any) => toBookingType(booking));
    }
}