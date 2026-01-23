import { db } from '../config/firebase';
import { Order } from '../models/Order';

export class OrderService {
    async createOrder(orderData: Order): Promise<string> {
        const orderRef = await db.collection('orders').add(orderData);
        return orderRef.id;
    }

    async getUserOrders(userId: string): Promise<Order[]> {
        const ordersSnapshot = await db.collection('orders').where('userId', '==', userId).get();
        const orders: Order[] = [];
        ordersSnapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() } as Order);
        });
        return orders;
    }

    async getOrderDetails(orderId: string): Promise<Order | null> {
        const orderDoc = await db.collection('orders').doc(orderId).get();
        if (orderDoc.exists) {
            return { id: orderDoc.id, ...orderDoc.data() } as Order;
        }
        return null;
    }
}