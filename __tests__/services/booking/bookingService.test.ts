import { BookingService } from "../../../services/booking/bookingService";
import { IBookingRepository } from "../../../repository/bookingRepository";

describe('bookingService', ()=> {
    // objects like input, book, and bookingRepository are repeated across our test so initialized them once here
    let bookingRepository: jest.Mocked<IBookingRepository>;
    let bookingService: BookingService;

    let input: {
        id: string;
        date: Date;
        time: string;
        numberOfPeople: number;
    };

    let book : {
        id: string,
        date: Date,
        time: string,
        numberOfPeople: number,
        customer: {
            id: string,
            email: string,
        }
    };


    // runs before each it() helps define above ones
    beforeEach(()=> {
        input = {
            id: "bookID123",
            date: new Date("2025-06-19"),
            time: "2:00",
            numberOfPeople: 4
        };

        book = {
            id: "bookID123",
            date: new Date("2025-06-19"),
            time: "2:00",
            numberOfPeople: 4,
            customer: {
                id: 'userID456',
                email: 'user@example.com'
            }
        };

        bookingRepository = {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        } as unknown as jest.Mocked<IBookingRepository>;

        bookingService = new BookingService(bookingRepository);
    });

    it('throws an error if user already book at same date and time', async() => {
        bookingRepository.findOne.mockResolvedValue(book);
        await expect(bookingService.bookTable(input.id, new Date(input.date), input.time, input.numberOfPeople)).rejects.toThrow('You have already booked a table at this time');
    });

    it('correctly creates and returns new booking ', async ()=> {
        bookingRepository.findOne.mockResolvedValue(null);
        bookingRepository.create.mockResolvedValue(input);

        const newBooking = await bookingService.bookTable(input.id, new Date(input.date), input.time, input.numberOfPeople);
        
        expect(newBooking).toEqual(input);      
    });

    it('returns all booking for a user', async()=> {
        bookingRepository.findOne.mockResolvedValue(null);
        bookingRepository.find.mockResolvedValue([book]);

        const result = await bookingService.myBooking(input.id);

        expect(result).toEqual([book]); 
    });

    it('returns all bookings', async()=> {
        bookingRepository.findOne.mockResolvedValue(null);
        bookingRepository.findAll.mockResolvedValue([book]);

        const results = await bookingService.allBooking();

        expect(results).toEqual([book]);

    });
});