const Menu = require('../models/menu');
const Order = require('../models/order');

exports.placeOrder = async(req, res) => {
    try{
        const {items} = req.body;
        const customer = req.user._id;

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
        res.status(500).json({
            status: "error",
            message: "Failed to place an order",
            error: error.message
        });
    }
}

exports.getOrder = async(req, res) => {
    try{
        const userId = req.user._id;

        const order = await Order.find({ customer: userId })
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 }); 

        return res.status(200).json({
            status: "success",
            message: "Successfuly fetched users order",
            data: order
        });

    }catch(error){
        res.status(500).json({
            status: "error",
            message: "Failed to fetch users order",
            error: error.message
        });
    }
}


exports.getAllOrders = async(req, res) => {
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
        res.status(500).json({
            status: "error",
            message: "Failed to fetch orders",
            error: error.message
        });
    }
}