import { IOrder } from "../models/order";
import { FullPopulatedOrder, OrderType, PopulatedOrder } from "../types/order";

export const toOrder = (doc: any): OrderType=> {
    return {
        id: (doc._id ?? doc.id)?.toString(),
        customer: (doc.customer ?? doc.customerId).toString(),      //prisma accepts cutomerId
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: (item.product ?? item.productId).toString(),   
            quantity: item.quantity,
            id: (item._id ?? item.id)?.toString() 
        }))
    }
}

export const toPopulatedOrder = (doc: any): PopulatedOrder=> {
    return {
        id: (doc._id ?? doc.id).toString(),
        customer: (doc.customer ?? doc.customerId).toString(),
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: {
                id: (item.product._id ?? item.product.id).toString(),
                name: item.product.name,
                price: item.product.price,
            },
            quantity: item.quantity,
        }))
    }
}

export const toFullPopulatedOrder = (doc: any): FullPopulatedOrder=> {
    return {
        id: (doc._id ?? doc.id).toString(),
        customer: {              //since customer is objectId we need to ensure it's populated first and become object before we access .email
            id: (doc.customer._id ?? doc.customer.id).toString(),
            email: typeof doc.customer === 'object' && doc.customer !== null? (doc.customer as any).email : ''
        },
        totalPrice: doc.totalPrice,
        items: doc.items.map((item: any) => ({
            product: {
                id: (item.product._id ?? item.product.id).toString(),
                name: item.product.name,
                price: item.product.price
            },
            quantity: item.quantity
        }))
    }
}