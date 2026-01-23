import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public createOrder = async (req: Request, res: Response) => {
        try {
            const orderData = req.body;
            const newOrder = await this.orderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    };

    public getOrderHistory = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const orders = await this.orderService.getOrderHistory(userId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order history', error });
        }
    };

    public getOrderDetails = async (req: Request, res: Response) => {
        try {
            const orderId = req.params.orderId;
            const orderDetails = await this.orderService.getOrderDetails(orderId);
            res.status(200).json(orderDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order details', error });
        }
    };
}