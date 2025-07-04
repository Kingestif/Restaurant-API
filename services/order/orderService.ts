import { IOrderRepository } from "../../repository/orderRepository";
import { ItemType, OrderType } from "../../types/order";
import { AppError } from "../../utils/AppError";

export class OrderService {
    private orderRepository: IOrderRepository;
    constructor(orderRepository: IOrderRepository){
        this.orderRepository = orderRepository
    }

    async placeOrder(Items: ItemType[], id: string){
        let subtotal = 0;
        for (let key in Items) {
            const item = Items[key];
            const product = await this.orderRepository.findById(item.product);
            if(!product) throw new AppError('Menu item not found', 404);
            subtotal += product.price * item.quantity;
        }

        const taxRate = 0.10; // 10%
        const tax = subtotal * taxRate;
        const totalPrice = subtotal + tax;

        const input = {
            customer: id,
            totalPrice,
            items: Items
        }
        const newOrder = await this.orderRepository.create(input);

        return newOrder;
    }

    async getOrder(id: string) {
        const order = await this.orderRepository.find(id);
        return order;
    }

    async getAllOrders(){
        const order = await this.orderRepository.findAll();
        return order;
    }
}