import { IBookingRepository } from "../../repository/bookingRepository";
import { AppError } from "../../utils/AppError";

export class BookingService {
    private bookingRepository: IBookingRepository;

    constructor(bookingRepository: IBookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    async bookTable(id: string, date: Date, time: string, numberOfPeople: number){
        const existingBooking = await this.bookingRepository.findOne(id, date, time,);

        if(existingBooking){
            throw new AppError("You have already booked a table at this time", 409);
        }

        const newBooking = await this.bookingRepository.create(id, date, time, numberOfPeople);
        return newBooking;
    }

    async myBooking(id: string){
        const myBooking = await this.bookingRepository.find(id);
        return myBooking;
    }

    async allBooking(){
        const allUsers = await this.bookingRepository.findAll();
        return allUsers;
    }
}