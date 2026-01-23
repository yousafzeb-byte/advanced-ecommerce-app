export interface User {
    id: string;
    email: string;
    name: string;
    address: string;
    createdAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    userId: string;
    products: Array<{ productId: string; quantity: number }>;
    totalPrice: number;
    createdAt: Date;
}