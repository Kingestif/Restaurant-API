import User from '../models/users';
import Booking from '../models/booking';
import {Request, Response} from 'express';

export const bookTable = async(req:Request, res:Response) => {
    try{
        const {date, time, numberOfPeople} = req.body;

        if (!date || !time || !numberOfPeople) {
            res.status(400).json({
                status: "fail",
                message: "Date, time, and number of people are required",
            });
            return;
        }
        
        const customer = req.user!._id;

        const bookingDateTime = new Date(`${date}T${time}`);

        const now = new Date();

        if (bookingDateTime <= now) {
            res.status(400).json({
                status: "fail",
                message: "You can only book for a future date and time",
            });
            return;
        }
        
        const existingBooking = await Booking.findOne({customer, date, time,});

        if(existingBooking){
            res.status(409).json({
                status: "fail",
                message: "You have already booked a table at this time",
            });
            return;
        }

        const newBooking = await Booking.create({customer, date, time, numberOfPeople });
        
        res.status(200).json({
            status: "success",
            message: "Successfuly booked a table",
            table: newBooking
        });
        return;

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(500).json({
            status: "error",
            message: message
        });
        return;
    }
}

export const getMyBookings = async(req:Request, res:Response) => {
    try{
        const customer = req.user!._id
        const myBookings = await Booking.find({customer}).populate('customer', 'name email').sort({date: 1, time: 1});

        res.status(200).json({
            status: "success",
            results: myBookings.length,
            bookings: myBookings,
        });
        return;

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(500).json({
            status: "error",
            message: message
        });
        return;
    }
}

export const getAllBookings = async(req:Request, res:Response) => {
    try{
        const bookings = await Booking.find().populate('customer', 'name email').sort({date: 1, time: 1});

        res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings: bookings,
        });
        return;

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        res.status(500).json({
            status: "error",
            message: message
        });
        return;
    }
}