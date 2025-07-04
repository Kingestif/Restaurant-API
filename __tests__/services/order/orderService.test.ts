import { OrderRepository } from "../../../repository/orderRepository";
import { OrderService } from "../../../services/order/orderService";
import { ItemType } from "../../../types/order";

describe('orderService', ()=> {
    let orderRepository: jest.Mocked<OrderRepository>;
    let orderService: OrderService; 

    let id:string;

    let input: ItemType[];

    let order: {
        id?: string,
        customer: string,
        totalPrice: number,
        items: ItemType[]
    }

    let populatedOrder: {
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

    let fullOrderdData: {
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

    let menu: {
        id?: string,            
        name: string,
        description: string,
        price: number,
        category: string,
        available: boolean
    }

    beforeEach(()=> {
        id = 'orderID123';

        input = [
            {
                product: '123',
                quantity: 1
            }
        ]

        order = {
            id: 'orderID123',
            customer: '123',
            totalPrice: 12,
            items: [
                {
                    product: '123',
                    quantity: 1
                }
            ]
        }

        populatedOrder = {
            id: 'orderID123',
            customer: '123',
            totalPrice: 12,
            items: [
                {
                    product: {
                        id: "685167e81bb7640e4657481c",
                        name: "burger",
                        price: 500
                    },
                    quantity: 2
                }
            ]
        }

        fullOrderdData = {
            id: "686628e8087d272ee7dd529e",
            customer: {
                id: "6865237026d94682ee83ccb6",
                email: "customer@gmail.com"
            },
            totalPrice: 1650,
            items: [
                {
                    product: {
                        id: "685167e81bb7640e4657481c",
                        name: "burger",
                        price: 500
                    },
                    quantity: 2
                }
            ]
        },
        
        menu = {
            id: 'menuID123',
            name: 'Burger',
            description: 'wow burger',
            price: 200,
            category: 'Appetizer',
            available: true
        }

        orderRepository = {
            findById: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        orderService = new OrderService(orderRepository);
    });

    it('throws an error if menu is not found', async ()=> {
        orderRepository.findById.mockResolvedValue(null);
        await expect(orderService.placeOrder(input, id)).rejects.toThrow('Menu item not found');
    });

    it('correctly creates order saves and returns the result', async()=> {
        orderRepository.findById.mockResolvedValue(menu);
        orderRepository.create.mockResolvedValue(order);
        const result = await orderService.placeOrder(input, id);
        expect(result).toEqual(order);
    });

    it('correctly gets orders of all users', async()=> {
        orderRepository.findAll.mockResolvedValue([fullOrderdData]);
        const result = await orderService.getAllOrders();
        expect(result).toEqual([fullOrderdData]);
    });

    it('correctly get order of a user', async()=> {
        orderRepository.find.mockResolvedValue([populatedOrder]);
        const result = await orderService.getOrder(id);
        expect(result).toEqual([populatedOrder]);
    });
});