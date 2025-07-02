import { toFullPopulatedOrder, toOrder, toPopulatedOrder } from "../mapper/toOrderType";
import { FullPopulatedOrder, ItemType, OrderType, PopulatedOrder } from "../types/order";
import Menu from "../models/menu";
import Order from "../models/order";
import { MenuType } from "../types/menu";
import { toMenu } from "../mapper/toMenuType";

export interface IOrderRepository {
    findById(id: string): Promise<MenuType | null>;
    create(order: OrderType): Promise<OrderType>;
    find(id: string): Promise<PopulatedOrder>;
    findAll(): Promise<FullPopulatedOrder[]>;
}

export class OrderRepository implements IOrderRepository {
    async findById(id: string): Promise<MenuType | null> {
        const product = await Menu.findById(id);
        if(!product) return null;

        return toMenu(product);
    }

    async create(order: OrderType): Promise<OrderType> {
        const newOrder = await Order.create({
            customer: order.customer,
            items: order.items,
            totalPrice: order.totalPrice
        });
        return toOrder(newOrder);
    }

    async find(id: string): Promise<PopulatedOrder> {
        const order = await Order.find({ customer: id })
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 }); 

        return toPopulatedOrder(order);
    }

    async findAll(): Promise<FullPopulatedOrder[]> {
        const orders = await Order.find()
            .populate('customer', 'name email') 
            .populate('items.product', 'name price') 
            .sort({ createdAt: -1 });

        return orders.map((order: any) => toFullPopulatedOrder(order));
    }
}