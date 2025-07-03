export type ItemType = {
    product: string,
    quantity: number,
    id?: string
}

export type OrderType = {
    id?: string,
    customer: string,
    totalPrice: number,
    items: ItemType[]
}

export type PopulatedOrder = {
    id: string,
    customer: string,
    totalPrice: number,
    items: {
        product: {
            id: string,
            name: string,
            price: number
        },
        quantity: number,
        id?: string
    }[]
}

export type FullPopulatedOrder = {
    id: string,
    customer: {
        id: string,
        email: string
    },
    totalPrice: number,
    items: {
        product: {
            id?: string,
            name: string,
            price: number
        },
        quantity: number,
        id?: string
    }[]
}