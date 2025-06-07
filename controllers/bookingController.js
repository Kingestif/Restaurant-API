const User = require('../models/users');
const Booking = require('../models/booking');

exports.bookTable = async(req, res) => {
    try{
        const {date, time, numberOfPeople} = req.body;

        if (!date || !time || !numberOfPeople) {
            return res.status(400).json({
                status: "fail",
                message: "Date, time, and number of people are required",
            });
        }
        
        const customer = req.user._id;

        const bookingDateTime = new Date(`${date}T${time}`);

        const now = new Date();

        if (bookingDateTime <= now) {
            return res.status(400).json({
                status: "fail",
                message: "You can only book for a future date and time",
            });
        }
        
        const existingBooking = await Booking.findOne({customer, date, time,});

        if(existingBooking){
            return res.status(409).json({
                status: "fail",
                message: "You have already booked a table at this time",
            });
        }

        const newBooking = await Booking.create({customer, date, time, numberOfPeople });
        
        return res.status(200).json({
            status: "success",
            message: "Successfuly booked a table",
            table: newBooking
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to book a table",
            error: error.message
        });
    }
}

exports.getMyBookings = async(req, res) => {
    try{
        const customer = req.user._id
        const myBookings = await Booking.find({customer}).populate('customer', 'name email').sort({date: 1, time: 1});

        return res.status(200).json({
            status: "success",
            results: myBookings.length,
            bookings: myBookings,
        });

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch your bookings",
            error: error.message,
        });
    }
}

exports.getAllBookings = async(req, res) => {
    try{
        const bookings = await Booking.find().populate('customer', 'name email').sort({date: 1, time: 1});

        return res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings: bookings,
        });

    }catch(error){
        return res.status(500).json({
            status: "error",
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
}