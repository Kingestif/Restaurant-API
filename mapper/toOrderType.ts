import { FullPopulatedOrder, OrderType, PopulatedOrder } from "../types/order";

export const toOrder = (doc: any): OrderType=> {
    return {
        id: doc.id.toString(),
        customer: doc.name,
        totalPrice: doc.totalPrice,
        items: doc.items
    }
}

export const toPopulatedOrder = (doc: any): PopulatedOrder=> {
    return {
        id: doc.id.toString(),
        customer: doc.name,
        totalPrice: doc.totalPrice,
        items: doc.item.map((i: any) => ({
            product: {
                id: i.product.id,
                name: i.product.name,
                price: i.product.price
            }
        }))
    }
}

export const toFullPopulatedOrder = (doc: any): FullPopulatedOrder=> {
    return {
        id: doc.id.toString(),
        customer: {
            id: doc.customer.id,
            email: doc.customer.email
        },
        totalPrice: doc.totalPrice,
        items: doc.item.map((i: any) => ({
            product: {
                id: i.product.id,
                name: i.product.name,
                price: i.product.price
            }
        }))
    }
}