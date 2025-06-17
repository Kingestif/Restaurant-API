const app = express();
import { Request, Response } from "express";
import express from 'express';
import authRouter from './routes/authRoutes';
import menuRouter from './routes/menuRoutes';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import bookingRouter from './routes/bookingRoutes';
import morgan from 'morgan';
import cors from 'cors';

app.use(cors());
app.use(morgan('dev')); 
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/booking', bookingRouter);

app.get("/", (req: Request, res: Response) => {
    res.send(" Service  Is  Running");
});

export default app;
