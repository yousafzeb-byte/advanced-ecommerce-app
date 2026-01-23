import { db } from '../config/firebase';
import { Product } from '../models/Product';

export class ProductService {
    async createProduct(productData: Product): Promise<string> {
        const productRef = await db.collection('products').add(productData);
        return productRef.id;
    }

    async getAllProducts(): Promise<Product[]> {
        const snapshot = await db.collection('products').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    }

    async getProductById(productId: string): Promise<Product | null> {
        const doc = await db.collection('products').doc(productId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } as Product : null;
    }

    async updateProduct(productId: string, productData: Partial<Product>): Promise<void> {
        await db.collection('products').doc(productId).update(productData);
    }

    async deleteProduct(productId: string): Promise<void> {
        await db.collection('products').doc(productId).delete();
    }
}