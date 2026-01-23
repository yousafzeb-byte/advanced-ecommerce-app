import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.delete('/delete', authMiddleware, userController.deleteAccount);

export const userRoutes = router;