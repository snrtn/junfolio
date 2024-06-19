import { Router } from 'express';
import { signup } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import jwtBlacklist from '../middlewares/jwtBlacklist';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', jwtBlacklist, logout);

export default router;
