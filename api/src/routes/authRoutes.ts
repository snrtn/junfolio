import { Router } from 'express';
import { signup } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { detail } from '../controllers/auth/detail';
import jwtBlacklist from '../middlewares/jwtBlacklist';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', jwtBlacklist, logout);
router.get('/details', authMiddleware, detail);

export default router;
