import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

const router = Router();
const orderController = new OrderController();

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to fetch order history for a user
router.get('/history', orderController.getOrderHistory);

// Route to fetch a specific order by ID
router.get('/:id', orderController.getOrderById);

export const orderRoutes = router;