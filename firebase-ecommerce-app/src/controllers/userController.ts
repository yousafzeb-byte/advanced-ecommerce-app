import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUser(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            await this.userService.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}