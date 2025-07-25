import {NextFunction, Request, Response} from 'express';
import bookingValidation from '../validation/bookingValidation';
import { AppError } from '../utils/AppError';
import { BookingService } from '../services/booking/bookingService';
import { BookingRepositoryMongo, BookingRepositoryPrisma } from '../repository/bookingRepository';

export const bookTable = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const bookingRepository = new BookingRepositoryPrisma();
        const bookingService = new BookingService(bookingRepository);
        const {date, time, numberOfPeople} = bookingValidation.parse(req.body);

        
        const bookingDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        if(bookingDateTime <= now){
            throw new AppError("You can only book for a future date and time", 400);
        }
        
        if(!req.user){
            throw new AppError("User not found", 403);
        }
        const id = req.user.id;       //if error, on index.d.ts change to object and here to string

        const book = await bookingService.bookTable(id, date, time, numberOfPeople);
        
        res.status(200).json({
            status: 'success',
            message: "Successfuly booked a table",
            table: book
        });
        return;

    }catch(error){
        next(error);
    }
}

export const getMyBookings = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const bookingRepository = new BookingRepositoryPrisma();
        const bookingService = new BookingService(bookingRepository);

        if(!req.user) throw new AppError("User not found", 403);
        const id = req.user.id;


        const myBookings = await bookingService.myBooking(id);

        res.status(200).json({
            success: true,
            bookings: myBookings,
        });
        return;

    }catch(error){
        next(error);
    }
}

export const getAllBookings = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const bookingRepository = new BookingRepositoryPrisma();
        const bookingService = new BookingService(bookingRepository);
        const bookings = await bookingService.allBooking();

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            bookings: bookings,
        });
        return;

    }catch(error){
        next(error);
    }
}