import { db } from '../config/firebase';
import { User } from '../models/User';

export class UserService {
    async createUser(userData: User): Promise<void> {
        const userRef = db.collection('users').doc(userData.id);
        await userRef.set(userData);
    }

    async getUser(userId: string): Promise<User | null> {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        return doc.exists ? (doc.data() as User) : null;
    }

    async updateUser(userId: string, updatedData: Partial<User>): Promise<void> {
        const userRef = db.collection('users').doc(userId);
        await userRef.update(updatedData);
    }

    async deleteUser(userId: string): Promise<void> {
        const userRef = db.collection('users').doc(userId);
        await userRef.delete();
    }
}