import { MenuType } from "../types/menu"

export const toMenu = (doc:any):MenuType => {
    return {
        id: (doc._id ?? doc.id)?.toString(),
        name: doc.name,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        available: doc.available
    }
}