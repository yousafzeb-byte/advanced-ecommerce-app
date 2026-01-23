import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await this.authService.register(email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await this.authService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    };

    public logout = async (req: Request, res: Response) => {
        try {
            await this.authService.logout();
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export default new AuthController();