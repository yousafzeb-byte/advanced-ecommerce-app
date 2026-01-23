export interface Order {
    id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    totalPrice: number;
    createdAt: Date;
}