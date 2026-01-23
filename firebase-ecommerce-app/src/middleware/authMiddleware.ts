import { NextFunction, Request, Response } from 'express';
import { auth } from '../config/firebase';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    auth.verifyIdToken(token)
        .then(() => {
            next();
        })
        .catch(() => {
            return res.status(401).json({ message: 'Unauthorized' });
        });
};