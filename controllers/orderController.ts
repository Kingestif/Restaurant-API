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

export const getOrder = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        if(!req.user) throw new AppError('Unauthorized', 403);

        const customerID = req.user.id;

        const order = await orderService.getOrder(customerID);

        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched users order",
            data: order
        });

    }catch(error){
        next(error);
    }
}


export const getAllOrders = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const orderRepository = new OrderRepository();
        const orderService = new OrderService(orderRepository);

        const orders = await orderService.getAllOrders();

        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched all orders",
            data: orders
        });

    }catch(error){
        next(error);
    }
}