import { auth } from '../config/firebase';
import firebase from 'firebase/app';

export class AuthService {
    async register(email: string, password: string) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(email: string, password: string) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async logout() {
        try {
            await auth.signOut();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}