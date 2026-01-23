export interface User {
  uid: string;
  email: string;
  name?: string;
  address?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: Date;
  status: "pending" | "completed" | "cancelled";
}
