import Menu from '../models/menu';
import Order from '../models/order';
import {Request, Response} from 'express';

export const placeOrder = async(req:Request, res:Response) => {
    try{
        const {items} = req.body;
        const customer = req.user!._id;

        let subtotal = 0;
        
        for (let item of items) {
            const product = await Menu.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    status: "error",
                    message: `Menu item not found: ${item.product}`
                });
            }
            subtotal += product.price * item.quantity;
        }

        const taxRate = 0.10; // 10%
        const tax = subtotal * taxRate;
        const totalPrice = subtotal + tax;


        const newOrder = await Order.create({
            customer,
            items,
            totalPrice
        });

        return res.status(200).json({
            status: "success",
            message: "Successfuly placed an order",
            order: newOrder
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

export const getOrder = async(req:Request, res:Response) => {
    try{
        const userId = req.user!._id;

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