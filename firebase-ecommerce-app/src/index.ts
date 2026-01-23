import express from 'express';
import bodyParser from 'body-parser';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { orderRoutes } from './routes/orderRoutes';
import { initializeApp } from './config/firebase';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
initializeApp();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});