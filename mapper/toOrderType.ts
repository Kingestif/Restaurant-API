import { IOrder } from "../models/order";
import { FullPopulatedOrder, OrderType, PopulatedOrder } from "../types/order";

export const toOrder = (doc: IOrder): OrderType=> {
    return {
        id: doc._id.toString(),
        customer: doc.customer.toString(),
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: item.product.toString(), 
            quantity: item.quantity,
            id: item._id.toString() 
        }))
    }
}

export const toPopulatedOrder = (doc: IOrder): PopulatedOrder=> {
    return {
        id: doc._id.toString(),
        customer: doc.customer.toString(),
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: {
                id: item.product._id.toString(),
                name: item.product.name,
                price: item.product.price,
            },
            quantity: item.quantity,
        }))
    }
}

export const toFullPopulatedOrder = (doc: IOrder): FullPopulatedOrder=> {
    return {
        id: doc._id.toString(),
        customer: {         //since customer is objectId we need to ensure it's populated first and become object before we access .email
            id: doc.customer._id.toString(),
            email: typeof doc.customer === 'object' && doc.customer !== null? (doc.customer as any).email : ''
        },
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: {
                id: item.product._id.toString(),
                name: item.product.name,
                price: item.product.price
            },
            quantity: item.quantity
        }))
    }
}