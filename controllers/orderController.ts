import Order from '../models/order';
import {NextFunction, Request, Response} from 'express';
import { AppError } from '../utils/AppError';
import { OrderRepository } from '../repository/orderRepository';
import { OrderService } from '../services/order/orderService';
import { orderValidation } from '../validation/orderValidation';

export const placeOrder = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        const items = orderValidation.parse(req.body);

        if(!req.user) throw new AppError('unauthorize user', 403);
        const customerID = req.user.id;

        const newOrder = await orderService.placeOrder(items.items, customerID);

        return res.status(200).json({
            status: "success",
            message: "Successfuly placed an order",
            order: newOrder
        });

    }catch(error){
        next(error);
    }
}

export const getOrder = async(req:Request, res:Response) => {
    try{
        const userId = req.user!.id;

        const order = await Order.find({ customer: userId })
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 }); 

        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched users order",
            data: order
        });

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}


export const getAllOrders = async(req:Request, res:Response) => {
    try{
        const orders = await Order.find()
            .populate('customer', 'name email') 
            .populate('items.product', 'name price') 
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched all orders",
            data: orders
        });

    }catch(error){
        let message = "An unknown error happend";
        if(error instanceof Error){
            message = error.message;
        }

        return res.status(500).json({
            status: "error",
            message: message
        });
    }
}