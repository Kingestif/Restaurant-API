import { BookingService } from "../../../services/booking/bookingService";

describe('bookingService', ()=> {
    it('throws an error if user already book at same date and time', async() => {
        const input = {
            id: "123",
            date: "2025-06-19",
            time: "2:00",
            numberOfPeople: 4
        }

        const bookingRepository = {
            findOne: jest.fn().mockResolvedValue({id: input.id}),
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn()
        }
        const bookingService = new BookingService(bookingRepository);
        await expect(bookingService.bookTable(input.id, new Date(input.date), input.time, input.numberOfPeople)).rejects.toThrow('You have already booked a table at this time');
    });

    it('correctly creates and returns new booking ', async ()=> {
        const input = {
            id: "123",
            date: "2025-06-19",
            time: "2:00",
            numberOfPeople: 4
        }

        const bookingRepository = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({       
                id: input.id,
                date: new Date(input.date),
                time: input.time,
                numberOfPeople: input.numberOfPeople
            }),     
            find: jest.fn(),
            findAll: jest.fn()
        }

        const bookingService = new BookingService(bookingRepository);
        const newBooking = await bookingService.bookTable(input.id, new Date(input.date), input.time, input.numberOfPeople);
        
        expect(newBooking).toEqual({
            id: input.id,
            date: new Date(input.date),
            time: input.time,
            numberOfPeople: input.numberOfPeople
        });      
    });

    it('returns all booking for a user', async()=> {
        const id = "bookID123";

        const book = {
            id: "bookID123",
            date: "2025-06-19",
            time: "2:00",
            numberOfPeople: 4,
            customer: {
                id: 'userID456',
                email: 'user@example.com'
            }
        }

        const bookingRepository = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn(),    
            find: jest.fn().mockResolvedValue(
                [
                    {
                        id: book.id,
                        date: new Date(book.date),
                        time: book.time,
                        numberOfPeople: book.numberOfPeople,
                        customer: {
                            id: book.customer.id,
                            email: book.customer.email
                        }
                    }
                ]
            ),

            // ⦿ test using inline async function (not recommended) since not jest we cant spy on it
            
            // find: async(id: string)=>{       
            //     return [
            //         {
            //             id,
            //             date: new Date(book.date),
            //             time: book.time,
            //             numberOfPeople: book.numberOfPeople,
            //             customer: {
            //                 id: book.customer.id,
            //                 email: book.customer.email
            //             }
            //         }
            //     ]
            // },

            findAll: jest.fn()
        }

        const bookingService = new BookingService(bookingRepository);
        const result = await bookingService.myBooking(id);

        expect(result).toEqual([
            {
                id: id,
                date: new Date(book.date),
                time: book.time,
                numberOfPeople: book.numberOfPeople,
                customer: {
                    id: book.customer.id,
                    email: book.customer.email
                }
            }
        ]); 
    });

    it('returns all bookings', async()=> {
        const book = {
            id: "bookID123",
            date: "2025-06-19",
            time: "2:00",
            numberOfPeople: 4,
            customer: {
                id: 'userID456',
                email: 'user@example.com'
            }
        }

        const bookingRepository = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn(),    
            find: jest.fn(),
            findAll: jest.fn().mockResolvedValue(
                [
                    {
                        id: book.id,
                        date: new Date(book.date),
                        time: book.time,
                        numberOfPeople: book.numberOfPeople,
                        customer: {
                            id: book.customer.id,
                            email: book.customer.email
                        }
                    }
                ]
            )
        }

        const bookingService = new BookingService(bookingRepository);
        const results = await bookingService.allBooking();

        expect(results).toEqual(
            [
                {
                    id: book.id,
                    date: new Date(book.date),
                    time: book.time,
                    numberOfPeople: book.numberOfPeople,
                    customer: {
                        id: book.customer.id,
                        email: book.customer.email
                    }
                }
            ]
        );

    });
});